import Navbar from '../../components/Navbar';
import ManagementLayout from '../../layouts/ManagementLayout';
import Dashboard from '../../components/Dashboard';
import DashboardSidebar from '../../components/Sidebar/DashboardSidebar';

const DashboardPage = () => {
    return (
        <ManagementLayout
            Sidebar={<DashboardSidebar />}
            Navbar={<Navbar />}
            Content={<Dashboard />}
        />
    );
};

export default DashboardPage;
