import MainLayout from '../../layouts/MainLayout/MainLayout';

import Sidebar from '../../components/Sidebar';
import Navbar from '../../components/Navbar';
import Playbar from '../../components/Playbar';
import Categories from '../../components/Categories';

function SearchPage() {
    return (
        <MainLayout
            Sidebar={Sidebar}
            Navbar={Navbar}
            Content={Categories}
            Playbar={Playbar}
        />
    );
}

export default SearchPage;
