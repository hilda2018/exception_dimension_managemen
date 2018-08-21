import { combineReducers } from 'redux-immutable';
import { reducer as exceptionListReducer }  from './../ExceptionList/store';
import { reducer as exceptionTableReducer } from './../ExceptionTable/store';

//combineReducers  生成reducer   => redux-immutable'

const reducer = combineReducers({
    ExceptionList: exceptionListReducer,
    ExceptionTable: exceptionTableReducer
});
export default reducer;
