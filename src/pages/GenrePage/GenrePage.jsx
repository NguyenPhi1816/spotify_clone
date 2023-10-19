import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import Content from '../../components/Content';
import Navbar from '../../components/Navbar';
import Playbar from '../../components/Playbar';
import Sidebar from '../../components/Sidebar';
import MainLayout from '../../layouts/MainLayout';
import { getCategoryChildById } from '../../services/categoryServices';

const GenrePage = () => {
    const { id, title } = useParams();
    const [data, setData] = useState([]);

    useEffect(() => {
        getCategoryChildById(id).then((res) => {
            return setData(res.data);
        });
    }, []);

    // console.log(data);

    return (
        <MainLayout
            Sidebar={<Sidebar />}
            Navbar={<Navbar />}
            Content={<Content title={title} data={data} />}
            Playbar={<Playbar />}
        />
    );
};

export default GenrePage;
