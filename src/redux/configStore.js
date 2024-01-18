import { createStore, combineReducers, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import userSlice from './reducer/userSlice';
import courseList from './reducer/courseListSlice';
import accountManagerSlice from './reducer/admin/accountManagerSlice';
import courseManagerSlice from './reducer/admin/courseManagerSlice';

const rootReducer = combineReducers({
    userSlice,courseList,accountManagerSlice, courseManagerSlice
})

const store = createStore(rootReducer, composeWithDevTools(
    applyMiddleware(thunk)
));

export default store