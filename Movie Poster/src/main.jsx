import React from 'react'
import ReactDOM from 'react-dom/client'
import {
	createBrowserRouter,
	RouterProvider
} from 'react-router-dom'
import RootPage from './routes/root'
import PosterPage from './routes/poster-page'
import SignupPage from './routes/signup-page'
import GlobalStyles from './style/GlobalStyles'

const routes = [
	{
		path: "/",
		element: <RootPage />,
	},
	{
		path: '/signup',
		element: <SignupPage />
	},
	{
		path: '/list/:sortBy',
		element: <PosterPage />
	},
]

const router = createBrowserRouter(routes)


ReactDOM.createRoot(document.getElementById('root')).render(
	<React.StrictMode>
		<GlobalStyles />
		<RouterProvider router={router} />
	</React.StrictMode>,
);
