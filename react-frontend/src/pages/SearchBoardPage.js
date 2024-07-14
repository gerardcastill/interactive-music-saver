import React from 'react';
import SearchBoard from "../components/SearchBoard";
import SidebarLayout from "../components/layouts/SidebarLayout";

function SearchBoardPage() {
    return (
        <SidebarLayout>
            <SearchBoard />
        </SidebarLayout>
    );
}

export default SearchBoardPage;