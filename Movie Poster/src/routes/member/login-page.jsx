import { useState } from "react";
import Body from "../../components/Body";
import { FormTitle, Form, InputBox } from "../../style/FormStyles";

const validObj = {
    id: {
        empty_msg: '아이디를 입력해주세요!',
        placeholder: '아이디를 입력해주세요',
    },
    password: {
        empty_msg: '비밀번호를 입력해주세요!',
        placeholder: '비밀번호를 입력해주세요',
    },
}

function LoginPage() {
    const [ success, setSuccess ] = useState(false);
    const [ formData, setFormData ] = useState({
        id: {
            value: '',
            success: true,
            validation_msg: validObj['id'].empty_msg,
        },
        password: {
            value: '',
            success: true,
            validation_msg: validObj['password'].empty_msg,
        },
    });

    const checkValidation = function () {
        let all_success = true;
        Object.entries(formData).map(([idx, data]) => {
            if (data.value === '') {
                data.success = false;
                data.validation_msg = validObj[idx].empty_msg;
            } else {
                data.success = true;
                data.validation_msg = '';
            }
            if (!data.success) {
                all_success = false;
            }
        });
        setFormData({...formData});
        setSuccess(all_success);
    }

    return (
        <Body>
            <FormTitle>로그인 페이지</FormTitle>
            <Form method="post" onSubmit={(e) => {
                e.preventDefault();
                checkValidation();
            }}>
                {Object.entries(formData).map(([idx, obj]) => {
                    return (
                        <InputBox key={idx}>
                            <input type={idx == 'password' ? 'password' : 'text'} placeholder={validObj[idx].placeholder} value={obj.value} onChange={(e) => {
                                obj.value = e.target.value;
                                checkValidation();
                                setFormData({...formData});
                            }} />
                            <div className={obj.success ? '' : 'active'} >{obj.validation_msg}</div>
                        </InputBox>
                    )
                })}
                <button type="submit" className={success ? 'success' : ''} disabled={success ? false : true}>로그인</button>
            </Form>
        </Body>
    )
}

export default LoginPage;