import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import Content from '../../components/Content';
import Navbar from '../../components/Navbar';
import Playbar from '../../components/Playbar';
import Sidebar from '../../components/Sidebar';
import MainLayout from '../../layouts/MainLayout';
import { getCategoryChildById } from '../../services/categoryServices';
import Loading from '../../components/Loading';
import {
    dialogContextTypes,
    useDialogContext,
} from '../../context/DialogContext';
import { MessageType } from '../../dialog/MessageDialog/MessageDialog';

const GenrePage = () => {
    const { dispatch: dialogDispatch } = useDialogContext();

    const { id, title } = useParams();
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        setIsLoading(true);
        getCategoryChildById(id)
            .then((res) => {
                setData(res.data);
            })
            .catch((error) => {
                dialogDispatch({
                    type: dialogContextTypes.SHOW_MESSAGE_DIALOG,
                    message: {
                        title: 'Có lỗi xảy ra',
                        message: error.message,
                        type: MessageType.ERROR,
                    },
                });
            })
            .finally(() => setIsLoading(false));
    }, []);

    return (
        <MainLayout
            Sidebar={<Sidebar />}
            Navbar={<Navbar />}
            Content={
                isLoading ? <Loading /> : <Content title={title} data={data} />
            }
            Playbar={<Playbar />}
        />
    );
};

export default GenrePage;
