import { useSelector, useDispatch } from 'react-redux';
import { remove, complete } from '../redux/todoSlice';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashCan } from '@fortawesome/free-solid-svg-icons';
import styled from 'styled-components';

const TodoListStyle = styled.ul`
    list-style: none;
    height: 100%;
    width: 100%;
    padding: 0 4rem;
    overflow-y: auto;
    & > li {
        height: 4rem;
        display: flex;
        justify-content: space-between;
        align-items: center;
        border-bottom: 1px solid #DAD3BE;
        margin-bottom: 1rem;
        & > div {
            font-size: 1.4rem;
            width: 85%;
        }
    }
`

function TodoList() {
    const todoList = useSelector(state => state.todo);
    const dispatch = useDispatch();

    const trash = <FontAwesomeIcon icon={faTrashCan} />

    console.log(todoList);

    return (
        <TodoListStyle>
            {todoList.map((todo, index) => (
                <li key={index}>
                    <input type="checkbox" onChange={() => dispatch(complete(todoList[index].id))} />
                    <div>{todo.complete === false ? <>{todo.text}</> : <del>{todo.text}</del>}</div>
                    <button type="button" onClick={() => dispatch(remove(todoList[index].id))}>{trash}</button>
                </li>
            ))}
        </TodoListStyle>
    )
}

export default TodoList;
