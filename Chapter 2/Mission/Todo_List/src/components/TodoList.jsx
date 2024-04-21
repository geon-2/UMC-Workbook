import { useState } from 'react'

function TodoList () {
    const [todos, setTodos] = useState([]);

    const addTodo = (content) => {
        const newTodo = { content: content, isDone: false };
        setTodos([...todos, newTodo]);
    };

    return (
        <section id="main-section"> 
            <form action="#" method='post' id='task-add-form' onSubmit={(e) => {
                e.preventDefault()
                const formData = new FormData(e.target)
                const content = formData.get('content')
                addTodo(content)
            }}>
                <input type="text" name='content' />
                <button type='submit'></button>
            </form>
            <div id="list-cover">
                <div className="task-area">
                    <h3><span>해야할 일</span></h3>
                    <div className="task-list">
                        {todos.map((todo, index) => {
                            if (!todo.isDone) {
                                return (
                                    <div className="task" key={index}>
                                        <span>{todo.content}</span>
                                        <button onClick={() => {
                                            const updatedTodos = [...todos];
                                            updatedTodos[index].isDone = true;
                                            setTodos(updatedTodos);
                                        }}>완료</button>
                                    </div>
                                );
                            }
                        })}
                    </div>
                </div>
                <div className="task-area">
                    <h3><span>해낸 일</span></h3>
                    <div className="task-list">
                        {todos.map((todo, index) => {
                            if (todo.isDone) {
                                return (
                                    <div className="task" key={index}>
                                        <span>{todo.content}</span>
                                        <button onClick={() => {
                                            const updatedTodos = todos.filter((_, i) => i !== index);
                                            setTodos(updatedTodos);
                                        }}>삭제</button>
                                    </div>
                                );
                            }
                        })}
                    </div>
                </div>
            </div>
        </section>
    )
}

export default TodoList;
