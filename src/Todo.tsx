import React, { useState, useEffect, ChangeEvent } from 'react';
import List from './List';
import './Todo.css';

const Todo = () => {
    const [inputData, setInputData] = useState<string>('');
    const [list, setList] = useState<string[]>([]);

    // Load Todo List from local storage on component mount
    useEffect(() => {
        const storeTodo = localStorage.getItem('list');
        if (storeTodo) {
            setList(JSON.parse(storeTodo) as string[]);
        }
    }, []);

    // Add item to the local storage
    useEffect(() => {
        if (list.length > 0) {
            localStorage.setItem('list', JSON.stringify(list));
        }
    }, [list]);

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setInputData(e.target.value);
    };

    const createList = () => {
        if (inputData.trim() !== '' && isNaN(Number(inputData))) {
            setList([...list, inputData.trim()]);
            setInputData('');
        } else {
            alert('Please enter valid todo data');
        }
    };

    const removeItem = (index: number) => {
        const confirmation = window.confirm('Are you sure to delete this item?');
        if (confirmation) {
            const newList = list.filter((_, idx) => idx !== index);
            setList(newList);
        }
    };

    const clearAll = () => {
        const confirmation = window.confirm('Are you sure to delete all list items?');
        if (confirmation) {
            setList([]);
            localStorage.removeItem('list');
        }
    };

    return (
        <div className="todo-container">
            <h1>Todo List</h1>
            <div className="input-container">
                <input
                    type="text"
                    placeholder="Write todo here"
                    value={inputData}
                    onChange={handleChange}
                />
                <button onClick={createList}>Add Todo</button>
            </div>

            <List list={list} onRemove={removeItem} />
            {list.length > 0 && <button className="clearButton" onClick={clearAll}>Clear All</button>}
        </div>
    );
};

export default Todo;
