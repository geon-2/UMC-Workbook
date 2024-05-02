import styled from 'styled-components';
import { Link, useLocation } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import { useState } from 'react'

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
	width: 40rem;
`;

const Home = styled(Link)`
	color: #fff;
	font-size: 2rem;
`

const StyledLink = styled(Link).attrs(props => ({
	isActive: props.isActive
}))`
	font-size: 1.5rem;
	font-weight: ${({ isActive }) => isActive ? '600' : '400'};
	color: ${({ isActive }) => isActive ? 'yellow' : '#fff'};
	&:hover {
	font-weight: 800;
	}
`

function NavigationBar() {
	const [cookies, setCookie] = useCookies(['state']);
	const [member, setMember] = useState(Boolean(cookies.state))
	const location = useLocation();
	
	const isActive = (path) => {
		return location.pathname === path;
	}
	
	const linkList = [
		{ url: '/', text: '회원가입' },
		{ url: '/list/popular', text: 'Popular' },
		{ url: '/list/now_playing', text: 'Now Playing' },
		{ url: '/list/top_rated', text: 'Top Rated' },
		{ url: '/list/upcoming', text: 'Upcoming' }
	]
	
	return (
		<Header>
			<Home>UMC Movie</Home>
			<Nav>
				<Link to="/" style={StyledLink} isActive={() => {}} onClick={(e) => {
					e.preventDefault();
					if (member) {
						setCookie('state','');
						setMember(false)
					} else {
						setCookie('state','1');
						setMember(true)
					}
				}}>{member ? "로그아웃" : "로그인"}</Link>
				{linkList.map((item, index) => <StyledLink key={index} to={item.url} isActive={isActive(item.url)}>{item.text}</StyledLink> )}
			</Nav>
		</Header>
	);
}

export default NavigationBar;
