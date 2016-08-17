import { combineReducers } from 'redux';
import {reducer as formReducer} from 'redux-form';

import CompaniesReducer from './reducers_companies';
import EntitiesReducer from './reducers_entities';
import RolesReducer from './reducers_roles';

const rootReducer = combineReducers({
  companies: CompaniesReducer,
  entities:EntitiesReducer,
  roles:RolesReducer,
  form:formReducer
});

export default rootReducer;