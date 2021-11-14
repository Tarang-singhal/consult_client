import { createStore, combineReducers, applyMiddleware } from 'redux';
import authReducer from './auth';
import ReduxThunk from 'redux-thunk';


const rootReducer = combineReducers({
  auth: authReducer
});

export default createStore(rootReducer, applyMiddleware(ReduxThunk));