import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import GlobalStyles from './style/GlobalStyles';
import RootPage from './routes/root';
import ErrorPage from './routes/error-page';
import PosterPage from './routes/movie/poster-page';
import MovieDetailPage from './routes/movie/movie-detail-page';
import SignUpPage from './routes/member/signup-page';
import LoginPage from './routes/member/login-page';
import LogoutHandler from './routes/member/logout';

const routes = [
    {
        path: '/',
        element: <RootPage />,
    },
    {
        path: '/list/:sortBy',
        element: <PosterPage />,
    },
    {
        path: '/movie/:movie_id',
        element: <MovieDetailPage />,
    },
    {
        path: '/signup',
        element: <SignUpPage />,
    },
    {
        path: '/login',
        element: <LoginPage />,
    },
    {
        path: '/logout',
        element: <LogoutHandler />
    }
];

const router = createBrowserRouter(routes);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <GlobalStyles />
		<RouterProvider router={router} />
    </React.StrictMode>
);
