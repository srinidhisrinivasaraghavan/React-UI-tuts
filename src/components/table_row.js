import React from 'react';

export default(props)=>{
	return(
		<tr key={props.id}>
			<td>
				{props.value}
			</td>
		</tr>
	);
}