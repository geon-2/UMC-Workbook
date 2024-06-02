import { useState } from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import { add } from '../redux/todoSlice';

const TodoForm = styled.div`
    box-sizing: border-box;
    width: 100%;
    padding: 0 4rem;
    margin-bottom: 2rem;
    & > h2 {
        width: 100%;
        color: #DAD3BE;
        font-size: 1.3rem;
        margin-bottom: 1rem;
    }
    & > form {
        display: flex;
        justify-content: space-between;
        height: 3rem;
    }
    & input {
        width: 70%;
        border: none;
        border-bottom: 2px solid #DAD3BE;
    }
    & button {
        width: 20%;
        background: #254336;
        color: #fff;
        border: none;
        border-radius: 5px;
    }
`;

function InputTodo() {
    const dispatch = useDispatch();

    const [ todoList, setTodoList ] = useState(
        {
            id: 0,
            text: ""
        }
    )

    function handleText(e) {
        setTodoList({text: e.target.value})
    }

    function onReset() {
        setTodoList({text: ""})
    }

    return (
        <TodoForm>
            <h2>Add a new Task</h2>
            <form onSubmit={(e) => {
                e.preventDefault();
                if (todoList.text !== "") {
                    dispatch(add(todoList.text))
                } else {
                    alert("할 일을 입력해주세요!")
                }
                onReset();
            }}>
                <input type="text" value={todoList.text} onChange={handleText} />
                <button type="submit">Add Todo</button>
            </form>
        </TodoForm>
    )
}

export default InputTodo;