import Navbar from '../../components/Navbar';
import Playbar from '../../components/Playbar';
import Sidebar from '../../components/Sidebar';
import MainLayout from '../../layouts/MainLayout';
import UserSection from '../../components/UserSection';

const UserPage = () => {
    return (
        <MainLayout
            Sidebar={<Sidebar />}
            Navbar={<Navbar />}
            Content={<UserSection />}
            Playbar={<Playbar />}
        />
    );
};

export default UserPage;
