import React from 'react';
import SidebarLayout from "../components/layouts/SidebarLayout";
import FavoritesList from "../components/FavoritesList";

function FavoritesPage() {
    return (
        <SidebarLayout>
            <FavoritesList />
        </SidebarLayout>
    );
}

export default FavoritesPage;