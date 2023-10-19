import Navbar from '../../components/Navbar';
import DashboardSidebar from '../../components/Sidebar/DashboardSidebar';
import SongEditing from '../../components/SongEditing/SongEditing';
import ManagementLayout from '../../layouts/ManagementLayout';

const SongEditingPage = () => {
    return (
        <ManagementLayout
            Sidebar={<DashboardSidebar />}
            Navbar={<Navbar />}
            Content={<SongEditing />}
        />
    );
};

export default SongEditingPage;
