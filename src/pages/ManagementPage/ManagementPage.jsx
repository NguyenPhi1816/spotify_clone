import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../../Context/Context';
import Navbar from '../../components/Navbar';
import ManagementLayout from '../../layouts/ManagementLayout';
import { isArtist } from '../../services/authorizationServices';
import { useEffect } from 'react';
import DashboardSidebar from '../../components/Sidebar/DashboardSidebar';
import Management from '../../components/Management';

const ManagementPage = () => {
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
            Content={<Management />}
        />
    );
};

export default ManagementPage;
