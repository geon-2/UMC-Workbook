import styled from 'styled-components';
import { useState, useEffect } from 'react';
import Body from '../components/body';

const Form = styled.form`
    diplay: flex;
    flex-direction: column;
    align-items: center;
    & > button {
        margin-top: 2rem;
    }
`

const InputBox = styled.div`
    width: 40rem;
    & > * {
        width: 100%;
    }
    & > input {
        width: 100%;
        height; 3rem;
        padding-left: 2rem;
        color: #eee;
        border: 1.5rem;
        background: #fff;
        margin-bottom: 2rem;
    }
    & > div {
        height: 1rem;
        margin-top: 2rem;
    }
`

const valid_obj = {
    name: {
        success_msg: "멋진 이름이네요!",
        empty_msg: '필수 입력 항목입니다.',
        placeholder: '이름을 입력해주세요.',
        validList: [
            {
                re: /^[a-zA-Zㄱ-ㅎ가-힣]+$/,
                msg: "이름은 문자열이어야 합니다."
            }
        ],
    },
    email: {
        success_msg: "올바른 이메일 형식입니다!",
        empty_msg: '올바른 이메일 형식이 아닙니다.',
        placeholder: '이메일을 입력해주세요.',
        validList: [
            {
                re: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                msg: "올바른 이메일 형석이 아닙니다!"
            }
        ],
    },
    age: {
        success_msg: "올바른 나이 형식이니다!",
        empty_msg: '나이를 입력해주세요!',
        placeholder: '나이를 입력해주세요.',
        validList: [
            {
                re: /([1-9][0-9]*)$/,
                msg: "나이는 숫자형식이어야 합니다!"
            },
            {
                re: /^(?!-).*[1-9][0-9]*$/,
                msg: "나이는 음수가 될 수 없습니다!"
            },
            {
                re: /^(?!\.)[1-9](?!\.)[0-9]*$/,
                msg: "나이는 소수가 될 수 없습니다!"
            },
        ],
    },
    pw: {
        success_msg: "올바른 비밀번호입니다!",
        empty_msg: '비밀번호는 최소 4자리 이상이어야 합니다.',
        placeholder: '비밀번호를 입력해주세요.',
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
                re: /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/,
                msg: "영어, 숫자, 특수문자를 모두 조합해서 비밀번호를 작성해야 합니다."
            }
        ],
    },
    pw_chk: {
        success_msg: "비밀번호가 일치합니다.",
        empty_msg: "비밀번호가 일치하지 않습니다.",
        placeholder: '비밀번호 확인',
    }
};

function SignUpPage() {
    const [formData, setFormData] = useState({
        name: {
            value: '',
            success: false,
            validation_msg: valid_obj['name'].empty_msg,
        },
        email: {
            value: '',
            success: false,
            validation_msg: valid_obj['email'].empty_msg,
        },
        age: {
            value: '',
            success: false,
            validation_msg: valid_obj['age'].empty_msg,
        },
        pw: {
            value: '',
            success: false,
            validation_msg: valid_obj['pw'].empty_msg,
        },
        pw_chk: {
            value: '',
            success: false,
            validation_msg: valid_obj['pw_chk'].empty_msg,
        }
    })

    useEffect(() => {
        formData.map((data, idx) => {
            if (data.success === false) {
                valid_obj[idx].validList.map((valid, idx) => {
                    if (valid.re.test(data.value)) {
                        setFormData({
                            ...formData,
                        })
                    }
                })
            }
        })
    }, [formData])

    return (
        <Body>
            <h1>회원가입 페이지</h1>
            <Form>
                {valid_obj.map((obj, idx) => {
                    return (
                        <InputBox key={idx}>
                            <input type="text" name={idx} placeholder={obj.placeholder} value={formData[idx].value}/>
                            <div>
                                {
                                    obj
                                }
                            </div>
                        </InputBox>
                    );
                })}
                <button>제출하기</button>
            </Form>
        </Body>
    );
}

export default SignUpPage;