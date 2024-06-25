import React, { useState } from "react";
import Header from "./Header";
import Form from "./Form";
import PackingList from "./PackingList";
import Footer from "./Footer";


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
	const clearList = () => {
		const confirmed = window.confirm("Are you sure you want to delete all items?")
		if (confirmed) setList([]);
	}

	return (
		<div className="app">
			<Header />
			<Form list={list} addItem={addItem} />
			<PackingList list={list} deleteItem={deleteItem} setPacked={setPacked} clearList={clearList} />
			<Footer length={list.length} packedItems={list.reduce((sum, a) => (a.packed ? sum+1: sum), 0) } />
		</div>
	);
}
