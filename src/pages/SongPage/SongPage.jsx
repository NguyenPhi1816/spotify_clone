import Navbar from '../../components/Navbar';
import Playbar from '../../components/Playbar';
import Sidebar from '../../components/Sidebar';
import MainLayout from '../../layouts/MainLayout';
import SongSection from '../../components/SongSection';

const SongPage = () => {
    return (
        <MainLayout
            Sidebar={<Sidebar />}
            Navbar={<Navbar />}
            Content={<SongSection />}
            Playbar={<Playbar />}
        />
    );
};

export default SongPage;
