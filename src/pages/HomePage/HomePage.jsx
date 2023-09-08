import MainLayout from '../../layouts/MainLayout/MainLayout';

import Sidebar from '../../components/Sidebar';
import Navbar from '../../components/Navbar';
import Content from '../../components/Content';
import Playbar from '../../components/Playbar';

function HomePage() {
    return (
        <MainLayout
            Sidebar={<Sidebar />}
            Navbar={<Navbar />}
            Content={<Content />}
            Playbar={<Playbar />}
        />
    );
}

export default HomePage;
