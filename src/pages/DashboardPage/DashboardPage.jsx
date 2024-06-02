import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../../context/Context';
import Navbar from '../../components/Navbar';
import ManagementLayout from '../../layouts/ManagementLayout';
import { isArtist } from '../../services/authorizationServices';
import { useEffect } from 'react';
import Dashboard from '../../components/Dashboard';
import DashboardSidebar from '../../components/Sidebar/DashboardSidebar';

const DashboardPage = () => {
    const navigate = useNavigate();
    const { state } = useAppContext();

    // useEffect(() => {
    //     if (state.authData === null || !isArtist(state.authData.user.role.id)) {
    //         navigate('/');
    //     }
    // }, []);

    return (
        <ManagementLayout
            Sidebar={<DashboardSidebar />}
            Navbar={<Navbar />}
            Content={<Dashboard />}
        />
    );
};

export default DashboardPage;
