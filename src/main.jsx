import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import App from './App.jsx';
import HomePage from './pages/HomePage';
import ErrorPage from './pages/ErrorPage';
import SearchPage from './pages/SearchPage';
import PlaylistPage from './pages/PlaylistPage';
import GenrePage from './pages/GenrePage';
import SectionPage from './pages/SectionPage';
import SongPage from './pages/SongPage';
import AlbumPage from './pages/AlbumPage';
import ArtistPage from './pages/ArtistPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import { AppProvider } from './Context/Context.jsx';
import DashboardPage from './pages/DashboardPage';
import ManagementPage from './pages/ManagementPage';
import MusicManagementPage from './pages/MusicManagementPage';
import AlbumManagementPage from './pages/AlbumManagementPage';
import AlbumEditingPage from './pages/AlbumEditingPage';
import SongEditingPage from './pages/SongEditingPage';
import UserPage from './pages/UserPage';

const router = createBrowserRouter([
    {
        path: '/',
        element: <App Component={HomePage} />,
        errorElement: <ErrorPage />,
    },
    {
        path: '/search',
        element: <App Component={SearchPage} />,
    },
    {
        path: '/playlist/:id',
        element: <App Component={PlaylistPage} />,
    },
    {
        path: '/genre/:id/:title',
        element: <App Component={GenrePage} />,
    },
    {
        path: '/section/:id',
        element: <App Component={SectionPage} />,
    },
    {
        path: '/track/:id',
        element: <App Component={SongPage} />,
    },
    {
        path: '/track/:id/edit',
        element: <App Component={SongEditingPage} />,
    },
    {
        path: '/album/:id',
        element: <App Component={AlbumPage} />,
    },
    {
        path: '/album/:id/edit',
        element: <App Component={AlbumEditingPage} />,
    },
    {
        path: '/artist/:id',
        element: <App Component={ArtistPage} />,
    },
    {
        path: '/user/:id',
        element: <App Component={UserPage} />,
    },
    {
        path: '/login',
        element: <App Component={LoginPage} />,
    },
    {
        path: '/register',
        element: <App Component={RegisterPage} />,
    },
    {
        path: '/dashboard/:id',
        element: <App Component={DashboardPage} />,
    },
    {
        path: '/management/:id',
        element: <App Component={ManagementPage} />,
    },
    {
        path: '/management/music/:id',
        element: <App Component={MusicManagementPage} />,
    },
    {
        path: '/management/album/:id',
        element: <App Component={AlbumManagementPage} />,
    },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <AppProvider>
            <RouterProvider router={router} />
        </AppProvider>
    </React.StrictMode>,
);
