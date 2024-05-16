import styled from 'styled-components';

const FormTitle = styled.h1`
    font-size: 2.5rem;
    text-align: center;
    margin-top: 3rem;
    margin-bottom: 5rem;
    color: #fff;
`

const Form = styled.form`
    diplay: flex;
    flex-direction: column;
    align-items: center;
    width: 40rem;
    margin: 0 auto; 
    & > button {
        margin-top: 2rem;
        color: #000;
        background: #fff;
        font-size: 1.5rem;
    }
    & > button, & input {
        width: 100%;
        height: 4rem;
        border-radius: 2rem;
    }
    & > button.success {
        background: yellow;
    }
`

const InputBox = styled.div`
    width: 100%;
    & > * {
        width: 100%;
    }
    & > input {
        width: 100%;
        height: 4rem;
        padding-left: 2rem;
        color: #000;
        border: 1.5rem;
        background: #fff;
        margin-bottom: 2rem;
        border-radius: 2rem;
    }
    & > div {
        height: 1rem;
        margin-bottom: 2rem;
        color: red;
        padding-left: 2rem;
        display: none;
    }
    & > div.active {
        display: block;
    }
`

export { FormTitle, Form, InputBox };