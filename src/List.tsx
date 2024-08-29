import React from 'react';

interface ListProps {
    list: string[];
    onRemove: (index: number) => void;
}

const List = ({ list, onRemove } : ListProps) => {
    return (
        <ul>
            {list.map((item, index) => (
                <li key={index}>
                    {item}
                    <button onClick={() => onRemove(index)}>Remove</button>
                </li>
            ))}
        </ul>
    );
};

export default List;
