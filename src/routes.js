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
import EntityDetails from './components/entities_details';
import EntityEdit from './components/entities_edit';

export default(
<Route path='/' component={App}>
<IndexRoute component ={Home} /> 	
<Route path='/companies' component={CompaniesIndex} />
<Route path='/companies/new' component={CompaniesNew} />
<Route path='/roles' component={RolesIndex} />
<Route path='/roles/new' component={RolesNew} />
<Route path='/entities' component={EntitiesIndex} />
<Route path='/entities/new' component={EntitiesNew} />
<Route path='/entities/:id' component={EntityDetails} />
<Route path='/entities/edit/:id' component={EntityEdit} />
</Route>
);