import Playlist from '../../components/Playlist';
import Navbar from '../../components/Navbar';
import Playbar from '../../components/Playbar';
import Sidebar from '../../components/Sidebar';
import MainLayout from '../../layouts/MainLayout';

const PlaylistPage = () => {
    return (
        <MainLayout
            Sidebar={<Sidebar />}
            Navbar={<Navbar />}
            Content={<Playlist />}
            Playbar={<Playbar />}
        />
    );
};

export default PlaylistPage;
