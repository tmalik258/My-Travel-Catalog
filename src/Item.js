import { useState } from "react";

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


export default Item;