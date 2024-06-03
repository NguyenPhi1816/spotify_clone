import Navbar from '../../components/Navbar';
import ManagementLayout from '../../layouts/ManagementLayout';
import DashboardSidebar from '../../components/Sidebar/DashboardSidebar';
import Management from '../../components/Management';

const ManagementPage = () => {
    return (
        <ManagementLayout
            Sidebar={<DashboardSidebar />}
            Navbar={<Navbar />}
            Content={<Management />}
        />
    );
};

export default ManagementPage;
