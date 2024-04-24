import React, { useState } from "react";

const initialItems = [
	{ id: 1, description: "Passports", quantity: 2, packed: true },
	{ id: 2, description: "Socks", quantity: 12, packed: false },
];

export default function App ()
{
    const [list, setList] = useState(initialItems);
    
    // Add item to list
	const addItem = (item) => {
        console.log( item );
        setList( [ ...list,  item] )
    };
    const deleteItem = ( id ) =>
    {
        setList(list.filter(item => item.id !==id))
    }
    const setPacked = ( id, isChecked ) =>
    {
        setList(list.map(item=> item.id === id ? {...item, packed: isChecked}: item ))
    }

	return (
		<div className="app">
			<Header />
			<Form list={list} addItem={addItem} />
			<PackingList list={list} deleteItem={deleteItem} setPacked={setPacked} />
			<Footer length={list.length} packedItems={list.reduce((sum, a) => (a.packed ? sum+1: sum), 0) } />
		</div>
	);
}

const Header = () => {
	return <h1>🌴 My Travel Catalog 👜</h1>;
};

const Form = ( { addItem, list } ) =>
{
    const [ description, setDescription ] = useState( "" )
    const [ quantity, setQuantity ] = useState( 1 );

    const handleSubmit = (e) =>
    {
        e.preventDefault();
        if ( !description ) return;
        addItem( { id: list.length, description: description, quantity: quantity, packed: false } );
        
        setDescription( '' );
        setQuantity( 1 );
    }

	return (
		<form className="add-form" onSubmit={handleSubmit}>
			<h3>What do you need for your 😍 trip? </h3>
            <select name="qty" value={quantity} onChange={(e) => setQuantity(parseInt(e.target.value))}>
                { Array.from( { length: 20 }, ( _, i ) => i + 1 ).map( num => <option value={ num } key={num}>{ num }</option>)}
            </select>
			<input type="text" name="description" value={description} onChange={(e) => setDescription(e.target.value)} />
			<input type="submit" value={'Add'} />
		</form>
	);
};

const PackingList = ({list, deleteItem, setPacked}) => {
	return (
		<div className="list">
			<ul>
				{list.map((item) => (
					<Item item={item} key={item.id} deleteItem={deleteItem} setPacked={setPacked} />
				))}
			</ul>
		</div>
	);
};

const Item = ( { item, deleteItem, setPacked } ) =>
{
    const [ isChecked, setIsChecked ] = useState( item.packed );

    const handleClick = () =>
    {
        setPacked(item.id, !isChecked);
        setIsChecked(!isChecked);
    }
	return (
        <li>
            <input type="checkbox" checked={isChecked} onClick={handleClick} />
			<span style={item.packed ? { textDecoration: "line-through" } : {}}>
				{item.quantity} {item.description}
			</span>
			<button onClick={() => deleteItem(item.id)}>❌</button>
		</li>
	);
};

const Footer = ({length, packedItems}) => {
	return (
		<footer className="stats">
			<em>You have {length} items on your list, and you already packed {packedItems} (X%)</em>
		</footer>
	);
};
