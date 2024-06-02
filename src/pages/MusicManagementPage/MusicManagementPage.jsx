import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../../context/Context';
import Navbar from '../../components/Navbar';
import ManagementLayout from '../../layouts/ManagementLayout';
import { isArtist } from '../../services/authorizationServices';
import { useEffect } from 'react';
import DashboardSidebar from '../../components/Sidebar/DashboardSidebar';
import MusicManagement from '../../components/MusicManagement';

const MusicManagementPage = () => {
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
            Content={<MusicManagement />}
        />
    );
};

export default MusicManagementPage;
