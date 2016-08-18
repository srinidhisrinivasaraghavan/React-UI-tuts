import React from 'react';
export default(props)=>{
	console.log(props);
	if(!props){
		return(
			<div>Loading..</div>
		);
	}
	return(
		<div className="col-md-4">
			<div className={`panel ${props.panelType}`}>
      			<div className="panel-heading">
      				{props.step}  
      				<span className={props.isDoneGlyph} aria-hidden="true">  </span>
      				<span data-toggle="tooltip" data-placement="left" title={props.title} className="glyphicon glyphicon-question-sign pull-right" aria-hidden="true"></span>
      			</div>
      			<div className="panel-body">
      				<p>{props.statusTag} Status : {props.status}    </p> 
      				<p>Date: {props.date}</p>
      			</div>
      		</div>
      	</div>
	);
}