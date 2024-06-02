import MainLayout from '../../layouts/MainLayout/MainLayout';

import Sidebar from '../../components/Sidebar';
import Navbar from '../../components/Navbar';
import Content from '../../components/Content';
import Playbar from '../../components/Playbar';
import { useEffect, useState } from 'react';
import { getHomeCategory } from '../../services/categoryServices';
import { type, useAppContext } from '../../context/Context';
import { MessageType } from '../../dialog/MessageDialog/MessageDialog';

function HomePage() {
    const { dispatch } = useAppContext();
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        setIsLoading(true);
        getHomeCategory()
            .then((res) => {
                setData(res.data);
            })
            .catch((error) =>
                dispatch({
                    type: type.SHOW_MESSAGE_DIALOG,
                    message: {
                        title: 'Có lỗi xảy ra',
                        message: error.message,
                        type: MessageType.ERROR,
                    },
                }),
            )
            .finally(() => {
                setIsLoading(false);
            });
    }, []);

    return (
        <MainLayout
            Sidebar={<Sidebar />}
            Navbar={<Navbar />}
            Content={<Content data={data} showSkeleton={isLoading} />}
            Playbar={<Playbar />}
        />
    );
}

export default HomePage;
