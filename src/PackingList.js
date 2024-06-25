import { useState } from "react";
import Item from "./Item";

const PackingList = ({list, deleteItem, setPacked, clearList}) => {
	const [sortBy, setSortBy] = useState("input");

	let sortedItems;
	if(sortBy === 'input') sortedItems = list;
	if(sortBy === 'description') sortedItems = list.slice().sort((a,b) => a.description.localeCompare(b.description));
	if(sortBy === 'packed') sortedItems = list.slice().sort((a,b) => Number(a.packed) - Number(b.packed));

	return (
		<div className="list">
			<ul>
				{sortedItems.map((item) => (
					<Item item={item} key={item.id} deleteItem={deleteItem} setPacked={setPacked} />
				))}
			</ul>

			<div className="actions">
				<select value={sortBy} onChange={e => setSortBy(e.target.value)}>
					<option value="input">Sort by Input Order</option>
					<option value="description">Sort by Description</option>
					<option value="packed">Sort by Packed Status</option>
				</select>
				<button onClick={clearList}>Clear List</button>
			</div>
		</div>
	);
};

export default PackingList;