import React from 'react';
import {Route, IndexRoute} from 'react-router';
import App from './components/app';
import Home from './components/home';
import CompaniesNew from './components/companies_new';
import CompaniesIndex from './components/companies_index'
import RolesNew from './components/roles_new';
import RolesIndex from './components/roles_index'
import EntitiesNew from './components/entities_new';
import EntitiesIndex from './components/entities_index';
import EntityDetails from './components/entities_details'

export default(
<Route path='/' component={App}>
<IndexRoute component ={Home} /> 	
<Route path='/companies' component={CompaniesIndex} />
<Route path='/companiesnew' component={CompaniesNew} />
<Route path='/roles' component={RolesIndex} />
<Route path='/rolesnew' component={RolesNew} />
<Route path='/entities' component={EntitiesIndex} />
<Route path='/entitiesnew' component={EntitiesNew} />
<Route path='/entities/:id' component={EntityDetails} />
</Route>
);