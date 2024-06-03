import Navbar from '../../components/Navbar';
import ManagementLayout from '../../layouts/ManagementLayout';
import DashboardSidebar from '../../components/Sidebar/DashboardSidebar';
import AlbumManagement from '../../components/AlbumManagement';

const AlbumManagementPage = () => {
    return (
        <ManagementLayout
            Sidebar={<DashboardSidebar />}
            Navbar={<Navbar />}
            Content={<AlbumManagement />}
        />
    );
};

export default AlbumManagementPage;
