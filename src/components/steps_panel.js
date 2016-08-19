import React from 'react';
import {NOT_SENT,SENT_PENDING,SENT_SIGNED,CREATED,CONTRACT_NOT_EMAILED,CONTRACT_EMAILED,CONTRACT_NOT_SIGNED,CONTRACT_SIGNED,STEP1,STEP2,STEP3} from '../config/constants';

export default(props)=>{
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
      				<span data-toggle="tooltip" data-placement="left" title={`${props.step===STEP1 ? 'The entity has been created. Email to confirm account and sign contract is not sent' :props.step===STEP2 ? 'Email has been send. Entity has to accept the contract and confirm.' :'Entity has signed and confirmed the contract' }`}  className="glyphicon glyphicon-question-sign pull-right" aria-hidden="true"></span>
      			</div>
      			<div className="panel-body">
      				<p>{`${props.step===STEP1 ? 'Account' :'' }`}  Status : {props.status}    </p> 
      				<p>Date: {props.date}</p>
                              <button className={props.buttonClass} onClick={props.onClickHandler}>
                                    {`${props.step===STEP1 ? 'Send Email' :props.step===STEP2 ? 'Resend Email' :'Contract Signed' }`} 
                              </button>
      			</div>
      		</div>
      	</div>
	);
}