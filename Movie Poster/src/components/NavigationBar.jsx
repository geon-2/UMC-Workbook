import styled from 'styled-components';
import { Link, useLocation } from 'react-router-dom';
import { RxHamburgerMenu } from "react-icons/rx";

const FlexList = `
	display: flex;
	justify-content: space-between;
	align-items: center;
`;

const Header = styled.header`
    ${FlexList}
	width: 100%;
	height: 5rem;
	background: #171B39;
	box-sizing: border-box;
	padding: 0 2rem;
`;

const Nav = styled.nav`
	& > .nav-icon {
		display: none;
	}

	& > ul {
		${FlexList};

		& > li {
			margin-right: 1.5rem;
		}
	}

	@media (max-width: 768px) {
		& > .nav-icon {
			display: block;
			background: transperent;
			border: none;
		}

		& > ul {
			display: block;
			width: 100vw;
			position: fixed;
			top: 5rem;
			right: -100vw;
			height: calc(100vh - 5rem);
			box-sizing: border-box;
			background: #222549;
			padding: 2rem;
			transition: right 0.3s;
			z-index: 1000;

			& > li {
				margin-bottom: 2rem;
				& > a {
					font-size: 1.5rem;
				}
			}
		}

		& > .nav-icon.active + ul {
			right: 0;
		}
	}
`;

const Home = styled(Link)`
	color: #fff;
	font-size: 2rem;
`

const StyledLink = styled(Link).attrs(props => ({
	isactive: props.isactive
}))`
	font-size: 1.5rem;
	font-weight: ${({ isactive }) => isactive ? '600' : '400'};
	color: ${({ isactive }) => isactive ? 'yellow' : '#fff'};
	&:hover {
	font-weight: 800;
	}
`

function NavigationBar() {
	const location = useLocation();
	
	const isactive = (path) => {
		return location.pathname === path;
	}

	const accessToken = localStorage.getItem('accessToken');

	let linkList = [];
	if (accessToken) {
		linkList.push({ url: '/logout', text: '로그아웃' });
	} else {
		linkList.push({ url: '/login', text: '로그인' });
		linkList.push({ url: '/signup', text: '회원가입' });
	}

	linkList = [...linkList, 		
		{ url: '/list/popular', text: 'Popular' },
		{ url: '/list/now_playing', text: 'Now Playing' },
		{ url: '/list/top_rated', text: 'Top Rated' },
		{ url: '/list/upcoming', text: 'Upcoming' }
	]
	
	return (
		<Header>
			<Home to="/">UMC Movie</Home>
			<Nav>
				<button className="nav-icon" onClick={() => {
					const navIcon = document.querySelector('.nav-icon');
					navIcon.classList.toggle('active');
				}}><RxHamburgerMenu size='20' color='#fff' /></button>
				<ul>
					{linkList.map((item, index) => <li key={index}><StyledLink to={item.url} isactive={isactive(item.url)}>{item.text}</StyledLink></li> )}
				</ul>
			</Nav>
		</Header>
	);
}

export default NavigationBar;
