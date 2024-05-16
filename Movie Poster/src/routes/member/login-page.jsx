import { useState } from "react";
import Body from "../../components/Body";
import { FormTitle, Form, InputBox } from "../../style/FormStyles";

function LoginPage() {
    const [ id, setId ] = useState('');
    const [ password, setPassword ] = useState('');

    return (
        <Body>
            <FormTitle>로그인 페이지</FormTitle>
            <Form method="post">
                <InputBox>
                    <input type='text' placeholder="아이디" value={id} onChange={(e) => {setId(e.target.value)}} />
                </InputBox>
                <InputBox>
                    <input type='password' placeholder="비밀번호" value={password} onChange={(e) => {setPassword(e.target.value)}} />
                </InputBox>
                <button type="submit">로그인</button>
            </Form>
        </Body>
    )
}

export default LoginPage;