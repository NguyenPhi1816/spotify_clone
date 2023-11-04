import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import Content from '../../components/Content';
import Navbar from '../../components/Navbar';
import Playbar from '../../components/Playbar';
import Sidebar from '../../components/Sidebar';
import MainLayout from '../../layouts/MainLayout';
import { getCategoryChildById } from '../../services/categoryServices';
import Loading from '../../components/Loading';

const GenrePage = () => {
    const { id, title } = useParams();
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        setIsLoading(true);
        getCategoryChildById(id).then((res) => {
            setData(res.data);
            setIsLoading(false);
        });
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
