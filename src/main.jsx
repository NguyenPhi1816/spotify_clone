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
]);

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <RouterProvider router={router} />
    </React.StrictMode>,
);
