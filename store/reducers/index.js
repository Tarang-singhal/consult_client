import { createStore, combineReducers, applyMiddleware } from 'redux';
import authReducer from './auth';
import cashReducer from './cash'
import ReduxThunk from 'redux-thunk';


const rootReducer = combineReducers({
  auth: authReducer,
  cash: cashReducer
});

export default createStore(rootReducer, applyMiddleware(ReduxThunk));