import MainLayout from '../../layouts/MainLayout/MainLayout';

import Sidebar from '../../components/Sidebar';
import Navbar from '../../components/Navbar';
import Playbar from '../../components/Playbar';
import Categories from '../../components/Categories';
import { useState } from 'react';
import SearchResult from '../../components/SearchResult';

function SearchPage() {
    const [debouncedSearchValue, setDebouncedSearchValue] = useState('');

    const handleSearch = (value) => {
        setDebouncedSearchValue(value);
    };

    return (
        <MainLayout
            Sidebar={<Sidebar />}
            Navbar={<Navbar onSearch={handleSearch} showSearchBar />}
            Content={
                debouncedSearchValue ? (
                    <SearchResult searchValue={debouncedSearchValue} />
                ) : (
                    <Categories />
                )
            }
            Playbar={<Playbar />}
        />
    );
}

export default SearchPage;
