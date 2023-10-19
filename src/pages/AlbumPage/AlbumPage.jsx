import Navbar from '../../components/Navbar';
import Playbar from '../../components/Playbar';
import Sidebar from '../../components/Sidebar';
import MainLayout from '../../layouts/MainLayout';
import AlbumSection from '../../components/AlbumSection';

const AlbumPage = () => {
    return (
        <MainLayout
            Sidebar={<Sidebar />}
            Navbar={<Navbar />}
            Content={<AlbumSection />}
            Playbar={<Playbar />}
        />
    );
};

export default AlbumPage;
