import MainLayout from '../../layouts/MainLayout/MainLayout';

import Sidebar from '../../components/Sidebar';
import Navbar from '../../components/Navbar';
import Playbar from '../../components/Playbar';
import Section from '../../components/Section';

const SectionPage = ({}) => {
    return (
        <MainLayout
            Sidebar={<Sidebar />}
            Navbar={<Navbar />}
            Content={<Section />}
            Playbar={<Playbar />}
        />
    );
};

export default SectionPage;
