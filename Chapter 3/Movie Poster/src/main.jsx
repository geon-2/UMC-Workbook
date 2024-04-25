import React from 'react';
import ReactDOM from 'react-dom/client';
import {
	createBrowserRouter,
	RouterProvider
} from 'react-router-dom';
import RootPage from './routes/root'
import SignUpPage from './routes/signup-page'
import PosterPage from './routes/poster-page'
import ErrorPage from './error-page'
import GlobalStyles from './GlobalStyles';

const routes = [
	{
		path: "/",
		element: <RootPage />,
	},
	{
		path: "/signup",
		element: <SignUpPage />
	},
	{
		path: '/list/:sortBy',
		element: <PosterPage />
	}
]

const router = createBrowserRouter(routes, {
	errorElement: <ErrorPage />
})


ReactDOM.createRoot(document.getElementById('root')).render(
	<React.StrictMode>
		<GlobalStyles />
		<RouterProvider router={router} />
	</React.StrictMode>,
);
