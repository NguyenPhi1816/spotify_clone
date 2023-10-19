import AlbumEditing from '../../components/AlbumEditing';
import Navbar from '../../components/Navbar';
import DashboardSidebar from '../../components/Sidebar/DashboardSidebar';
import ManagementLayout from '../../layouts/ManagementLayout';

const AlbumEditingPage = () => {
    return (
        <ManagementLayout
            Sidebar={<DashboardSidebar />}
            Navbar={<Navbar />}
            Content={<AlbumEditing />}
        />
    );
};

export default AlbumEditingPage;
