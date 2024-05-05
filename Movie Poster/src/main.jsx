import React from 'react';
import ReactDOM from 'react-dom/client';
import {
	createBrowserRouter,
	RouterProvider
} from 'react-router-dom';
import GlobalStyles from './style/GlobalStyles';
import RootPage from './routes/root'
import PosterPage from './routes/poster-page'
import ErrorPage from './error-page'
import MovieDetailPage from './routes/movie-detail-page';

const routes = [
	{
		path: "/",
		element: <RootPage />,
		errorElement: <ErrorPage />,
		children: [
			{
				path: '/list/:sortBy',
				element: <PosterPage />
			},
			{
				path: '/movie/:movie_name',
				element: <MovieDetailPage />
			}
		]
	}
]

const router = createBrowserRouter(routes)


ReactDOM.createRoot(document.getElementById('root')).render(
	<React.StrictMode>
		<GlobalStyles />
		<RouterProvider router={router} />
	</React.StrictMode>,
);
