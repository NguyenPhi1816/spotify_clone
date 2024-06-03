import Navbar from '../../components/Navbar';
import ManagementLayout from '../../layouts/ManagementLayout';
import DashboardSidebar from '../../components/Sidebar/DashboardSidebar';
import MusicManagement from '../../components/MusicManagement';

const MusicManagementPage = () => {
    return (
        <ManagementLayout
            Sidebar={<DashboardSidebar />}
            Navbar={<Navbar />}
            Content={<MusicManagement />}
        />
    );
};

export default MusicManagementPage;
