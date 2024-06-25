const Footer = ({length, packedItems}) => {
	return (
		<footer className="stats">
			<em>You have {length} items on your list, and you already packed {packedItems} (X%)</em>
		</footer>
	);
};


export default Footer;