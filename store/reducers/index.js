import { createStore, combineReducers, applyMiddleware } from 'redux';
import authReducer from './auth';
import userReducer from './user'
import ReduxThunk from 'redux-thunk';


const rootReducer = combineReducers({
  auth: authReducer,
  user: userReducer
});

export default createStore(rootReducer, applyMiddleware(ReduxThunk));