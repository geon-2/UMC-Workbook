import { useEffect } from 'react';

function LogoutHandler () {

    const handlelogout = () => {
        if (localStorage.getItem('accessToken')) {
            localStorage.removeItem('accessToken');
            localStorage.removeItem('name');
            alert('로그아웃 되었습니다.');
        }
        window.location.href = '/';
    }

    useEffect(() => {
        handlelogout();
    }, [])

    return null;
}

export default LogoutHandler;