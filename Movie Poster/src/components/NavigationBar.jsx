import styled from 'styled-components';
import { Link, useLocation } from 'react-router-dom';

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
	${FlexList};
	& > a {
		margin-right: 1.5rem;
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
				{linkList.map((item, index) => <StyledLink key={index} to={item.url} isactive={isactive(item.url)}>{item.text}</StyledLink> )}
			</Nav>
		</Header>
	);
}

export default NavigationBar;
