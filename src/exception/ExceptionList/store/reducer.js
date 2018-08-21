import { fromJS } from 'immutable';
import * as actionTypes from './actionTypes';
const selectData = {
    'key': 'Y',
    'keyText': '是',
    'showId':'',
    'arrData': [
        { 'key': 'Y','text': '是' },
        { 'key': 'N','text': '否' }
    ] };


/*********** 以上是 虚拟数据，可被删除 ****************/
const defaultState = fromJS({  // 初始化 store ，store的数据结构
    pending: false,
    selectData ,
    exceptionData: [], //getExceptionData: [] 是异常情况类型列表数据
    exceptionTableData:[],
    id:'',
});

export default (state = defaultState, action) => {
    if(action.type === actionTypes.INIT_EXCEPTION_LIST_ACTION) {
        const newState = state.merge({ exceptionData: action.exceptionData });
        return  newState ;
    }

    if(action.type === actionTypes.SELECT_CHANGE_ACTION) {
        // console.log(25);
        const newState = state.merge({ exceptionTableData: action.tableData.data,id:action.tableData.id});      console.log(state);
        return newState ;
    }
    return state;
};
