import MainLayout from '../../layouts/MainLayout/MainLayout';

import Sidebar from '../../components/Sidebar';
import Navbar from '../../components/Navbar';
import Content from '../../components/Content';
import Playbar from '../../components/Playbar';
import { useEffect, useState } from 'react';
import { getHomeCategory } from '../../services/categoryServices';
import { type, useAppContext } from '../../Context/Context';
import Loading from '../../components/Loading';

function HomePage() {
    const { dispatch } = useAppContext();
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        setIsLoading(true);
        getHomeCategory().then((res) => {
            setData(res.data);
            setIsLoading(false);
        });
    }, []);

    return (
        <MainLayout
            Sidebar={<Sidebar />}
            Navbar={<Navbar />}
            Content={isLoading ? <Loading /> : <Content data={data} />}
            Playbar={<Playbar />}
        />
    );
}

export default HomePage;
