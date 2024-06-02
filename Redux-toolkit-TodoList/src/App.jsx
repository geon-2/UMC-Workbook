import styled from "styled-components";
import InputTodo from "./components/InputTodo";
import TodoList from "./components/TodoList";

const MainSection = styled.section`
  width: 100%;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #6B8A7A;
`;

const TodoBlock = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  box-sizing: border-box;
  width: 50rem;
  height: 50rem;
  background: #fff;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  border-radius: 2rem;
  overflow: hidden;
  & > h1 {
    font-size: 2.2rem;
    font-weight: 100;
    margin-bottom: 3rem;
    width: 100%;
    height: 6rem;
    line-height: 6rem;
    background: #254336;
    text-align: center;
    color: #fff;
  }
`

function App () {
  return (
    <MainSection>
      <TodoBlock>
        <h1>Todo List</h1>
        <InputTodo />
        <TodoList />
      </TodoBlock>
    </MainSection>
  );
}

export default App;