import { useState } from "react";

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

export default Form;