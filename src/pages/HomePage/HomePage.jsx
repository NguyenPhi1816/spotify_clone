import MainLayout from '../../layouts/MainLayout/MainLayout';

import Sidebar from '../../components/Sidebar';
import Navbar from '../../components/Navbar';
import Content from '../../components/Content';
import Playbar from '../../components/Playbar';
import { useEffect, useState } from 'react';
import { getHomeCategory } from '../../services/apiServices';

function HomePage() {
    const [data, setData] = useState([]);

    useEffect(() => {
        getHomeCategory().then((res) => setData(res.data));
    }, []);

    return (
        <MainLayout
            Sidebar={<Sidebar />}
            Navbar={<Navbar />}
            Content={<Content data={data} />}
            Playbar={<Playbar />}
        />
    );
}

export default HomePage;
