import axios from 'axios';
import { useEffect, useState } from 'react';

const App = () => {
    const [todo, setTodo] = useState([]);

    useEffect(() => {
        axios.get('https://jsonplaceholder.typicode.com/todos')
            .then((response) => {
                const todo = response?.data;
                setTodo(todo);
            })
    }, []);

    return (
        <div>
            Todo List
            {
                todo?.map(obj => {
                    return <div>{obj?.title}</div>
                })
            }
        </div>
    )
}

export default App;
