import Navbar from '../../components/Navbar';
import Playbar from '../../components/Playbar';
import Sidebar from '../../components/Sidebar';
import MainLayout from '../../layouts/MainLayout';
import ArtistSection from '../../components/ArtistSection';

const ArtistPage = () => {
    return (
        <MainLayout
            Sidebar={<Sidebar />}
            Navbar={<Navbar />}
            Content={<ArtistSection />}
            Playbar={<Playbar />}
        />
    );
};

export default ArtistPage;
