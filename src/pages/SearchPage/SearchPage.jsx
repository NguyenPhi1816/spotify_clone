import MainLayout from '../../layouts/MainLayout/MainLayout';

import Sidebar from '../../components/Sidebar';
import Navbar from '../../components/Navbar';
import Playbar from '../../components/Playbar';
import Categories from '../../components/Categories';
import { useEffect, useState } from 'react';
import SearchResult from '../../components/SearchResult';

function SearchPage() {
    const [isLoading, setIsLoading] = useState(false);
    const [debouncedSearchValue, setDebouncedSearchValue] = useState('');

    const handleSearch = (value) => {
        setDebouncedSearchValue(value);
    };

    return (
        <MainLayout
            Sidebar={<Sidebar />}
            Navbar={
                <Navbar
                    isLoading={isLoading}
                    onSearch={handleSearch}
                    showSearchBar
                />
            }
            Content={
                debouncedSearchValue ? (
                    <SearchResult
                        searchValue={debouncedSearchValue}
                        setIsLoading={setIsLoading}
                    />
                ) : (
                    <Categories />
                )
            }
            Playbar={<Playbar />}
        />
    );
}

export default SearchPage;
