import React from 'react';
import { Link } from 'react-router';

export default(props)=>{
	return(
			<div>
			<h4>{props.heading} 
				<Link to={props.linkTo} className="pull-right btn btn-sm btn-outline-primary">
					 <span className={props.buttonGlyph} aria-hidden="true"></span> {props.buttonText}
				</Link>
			</h4>
			<hr />
			</div>
	);
}