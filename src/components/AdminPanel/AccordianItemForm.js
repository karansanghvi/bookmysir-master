import React, { useState } from 'react';

const AccordionItemForm = ({ accordionItems, setAccordionItems }) => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');

    const handleAddItem = (e) => {
        e.preventDefault();
        const newItem = { title, content };
        setAccordionItems([...accordionItems, newItem]);
        setTitle('');
        setContent('');
    };

    return (
        <div>
            <h1>Accordion Items</h1>
            <form onSubmit={handleAddItem}>
                <div>
                    <label>Title:</label> <br />
                    <input 
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className='styledInput'
                    />
                </div>
                <div>
                    <label>Content:</label> <br />
                    <textarea
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        id='styledInputTextArea'
                    ></textarea>
                </div>
                <button type="submit">Add Item</button>
            </form>
            <ul>
                {accordionItems.map((item, index) => (
                    <li key={index}>
                        <h2>{item.title}</h2>
                        <p>{item.content}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default AccordionItemForm;
