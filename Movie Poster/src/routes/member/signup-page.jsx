import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import styled from 'styled-components';
import axios from 'axios';
import Body from '../../components/Body';
import { FormTitle, Form, InputBox } from '../../style/FormStyles';

const LoginLink = styled.div`
    width: 32rem;
    margin: 0 auto;
    margin-top: 4rem;
    color: #fff;
    display: flex;
    justify-content: space-between;
    font-size: 1.3rem;
`

const valid_obj = {
    username: {
        empty_msg: '이름을 입력해주세요!',
        placeholder: '이름을 입력해주세요',
        validList: [
            {
                re: /^[a-zA-Zㄱ-ㅎ가-힣0-9]+$/,
                msg: "이름을 입력해주세요!"
            }
        ],
    },
    id: {
        empty_msg: '아이디를 입력해주세요!',
        placeholder: '아이디를 입력해주세요',
        validList: [
            {
                re: /^[a-zA-Z0-9]{5,}$/,
                msg: "아이디는 최소 5자리 이상으로 구성해주세요!"
            }
        ],
    },
    email: {
        empty_msg: '이메일을 입력해주세요!',
        placeholder: '이메일을 입력해주세요',
        validList: [
            {
                re: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                msg: "이메일 형식에 맞게 다시 입력해주세요!"
            }
        ],
    },
    age: {
        empty_msg: '나이를 입력해주세요!',
        placeholder: '나이를 입력해주세요',
        validList: [
            {
                re: /([1-9][0-9]*)$/,
                msg: "나이는 숫자로 입력해주세요!"
            },
            {
                re: /^(?!-).*[1-9][0-9]*$/,
                msg: "나이는 음수가 될 수 없습니다."
            },
            {
                re: /^(?!\.)[1-9](?!\.)[0-9]*$/,
                msg: "나이는 소수가 될 수 없습니다."
            },
        ],
    },
    password: {
        empty_msg: '비밀번호를 입력해주세요!',
        placeholder: '비밀번호를 입력해주세요',
        validList: [
            {
                re: /^.{4,}$/,
                msg: "비밀번호는 최소 4자리 이상이어야 합니다."
            },
            {
                re: /^.{4,12}$/,
                msg: "비밀번호는 최대 12자리까지 가능합니다."
            },
            {
                re: /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^&*()])[a-zA-Z0-9!@#$%^&*()]{4,12}$/,
                msg: "비밀번호는 대소문자, 특수문자 포함 최소 4자리 이상 12자리 이하로 구성해주세요!"
            }
        ],
    },
    passwordCheck: {
        empty_msg: "비밀번호를 다시 입력해주세요!",
        placeholder: '비밀번호 확인',
    }
};

function SignUpPage() {
    const [formData, setFormData] = useState({
        username: {
            value: '',
            success: true,
            validation_msg: valid_obj['username'].empty_msg,
        },
        id: {
            value: '',
            success: true,
            validation_msg: valid_obj['id'].empty_msg,
        },
        email: {
            value: '',
            success: true,
            validation_msg: valid_obj['email'].empty_msg,
        },
        age: {
            value: '',
            success: true,
            validation_msg: valid_obj['age'].empty_msg,
        },
        password: {
            value: '',
            success: true,
            validation_msg: valid_obj['password'].empty_msg,
        },
        passwordCheck: {
            value: '',
            success: true,
            validation_msg: valid_obj['passwordCheck'].empty_msg,
        }
    })
    const [success, setSuccess] = useState(false);
    const navigate = useNavigate();

    const checkValidation = function () {
        let all_success = true;
        Object.entries(formData).map(([idx, data]) => {
            if (data.value === '') {
                data.success = false;
                data.validation_msg = valid_obj[idx].empty_msg;
            } else {
                if (idx == 'passwordCheck') {
                    if (formData['password'].value == formData['passwordCheck'].value) {
                        data.success = true;
                        data.validation_msg = valid_obj[idx].success_msg;
                    } else {
                        data.success = false;
                        data.validation_msg = valid_obj[idx].empty_msg;
                    }
                } else {
                    let chk = true;
                    for (let valid of Object.values(valid_obj[idx].validList)) {
                        if (!valid.re.test(data.value)) {
                            chk = false;
                            data.validation_msg = valid.msg;
                            break;
                        }
                    }
                    if (chk) {
                        data.success = true;
                        data.validation_msg = valid_obj[idx].success_msg;
                    }
                }
            }

            if (!data.success) {
                all_success = false;
            }
        })
        setSuccess(all_success);
        setFormData({...formData})
    }

    return (
        <Body>
            <FormTitle>회원가입 페이지</FormTitle>
            <Form method="post" onSubmit={(e) => {
                    e.preventDefault();
                    checkValidation();

                    if (success === true) {
                        const ServerUrl = import.meta.env.VITE_SERVER_URL+"/auth/signup";
                        axios.post(ServerUrl, {
                            name: formData['username'].value,
                            email: formData['email'].value,
                            age: formData['age'].value,
                            username: formData['id'].value,
                            password: formData['password'].value,
                            passwordCheck: formData['passwordCheck'].value
                        }).then(response => {
                            console.log(response);
                            alert('회원가입이 완료되었습니다.');
                            navigate('/login');
                        }).catch(error => {
                            if (error.response.status === 409) {
                                alert('이미 존재하는 아이디입니다.');
                                document.querySelector('input[name="id"]').focus();
                            } else {
                                console.error(error);
                            }
                        });
                        
                    }
                }}>
                {Object.entries(formData).map(([idx, obj]) => {
                    return (
                        <InputBox key={idx}>
                            <input type={idx == 'password' || idx == 'passwordCheck' ? 'password' : 'text'} onChange={(e) => {
                                obj.value = e.target.value;
                                setFormData({...formData});
                                checkValidation();
                            }} name={idx} placeholder={valid_obj[idx].placeholder} value={obj.value}/>
                            <div className={obj.success ? '' : 'active'} >{obj.validation_msg}</div>
                        </InputBox>
                    );
                })}
                <button type="submit" className={success ? 'success' : ''} disabled={success ? false : true}>제출하기</button>
            </Form>
            <LoginLink>
                <div>이미 아이디가 있으신가요?</div>
                <Link to="/login">로그인 페이지로 이동하기</Link>
            </LoginLink>
        </Body>
    );
}

export default SignUpPage;