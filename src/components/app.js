import React, { Component } from 'react';
import { Link } from 'react-router';

export default class App extends Component {
	handleClick(event){
		event.preventDefault();
		document.getElementById('wrapper').classList.toggle('toggled');
	}
  render() {
    return (
 <div id="wrapper">
        <div id="sidebar-wrapper">
            <ul className="sidebar-nav">
                <li className="sidebar-brand">
                    <a href="#">
                        Shangri La Registration
                    </a>
                </li>
                <li>
                	<Link to="/" >
						Home
					</Link>
                </li>
                <li>
                	 <Link to="/companies" >
						Companies
					</Link>
                </li>
                <li>
                    <Link to="/roles">Roles</Link>
                </li>
                <li>
                    <Link to="/entities">Entites</Link>
                </li>
            </ul>
        </div>
        
        <div id="page-content-wrapper">
            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-12 col-lg-12">
                        <a id="menu-toggle" onClick={this.handleClick} className="btn btn-default" id="menu-toggle"><span className="glyphicon glyphicon-menu-hamburger" aria-hidden="true"></span></a>
                        
               			{this.props.children}
                       
                    </div>
                </div>
            </div>
        </div>
    <script src="./js/jquery.js"></script>
    <script src="./js/bootstrap.min.js"></script>
    <script src="./js/toggle.js"></script>
    </div>
    );
  }
}