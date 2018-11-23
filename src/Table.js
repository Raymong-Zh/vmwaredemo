import React, {Component} from 'react';

const TableHeader = () => {
	return(
		<thead>
			<tr>
				<th>datacenter</th>
				<th>esxi_hostname</th>
				<th>datastore</th>
			</tr>
		</thead>
	);
}



const TableBody = props => {
	const rows = props.characterData.map((row, index) => {
		return (
			<tr key={index}>
				<td>{row.datacenter}</td>
				<td>{row.esxi_hostname}</td>
				<td>{row.datastore}</td>
				<td><button onClick={( ) => props.handleTrChange(row) } >Add</button></td>
			</tr>
		);
	});
	return <tbody>{rows}</tbody>
}

class Table extends Component{
	render(){
		const {characterData, handleTrChange} = this.props;
		return(
			<table>
				<TableHeader />
				<TableBody
					characterData={characterData}
					handleTrChange={handleTrChange}
				/>
			</table>
		);
	}
}

export default Table