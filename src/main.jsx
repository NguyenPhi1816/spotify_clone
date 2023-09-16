import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import App from './App.jsx';
import HomePage from './pages/HomePage';
import ErrorPage from './pages/ErrorPage';
import SearchPage from './pages/SearchPage';
import PlaylistPage from './pages/PlaylistPage/PlaylistPage.jsx';

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
]);

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <RouterProvider router={router} />
    </React.StrictMode>,
);
