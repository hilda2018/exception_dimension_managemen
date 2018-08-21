import { fromJS } from 'immutable';
import * as actionTypes from './actionTypes';

const defaultState = fromJS({
    dimentionData: {}
});


export default (state = defaultState, action) => {
    switch(action.type) {



        // 初始化 得到 基础维度数据
        case  actionTypes.INIT_EXCEPTION_DIMENTION_ACTION :
        return  state.merge({ dimentionData: action.dimentionData.data});


        //  表格增删改的操作
        case    actionTypes.HANDLE_TABLE_ACTION :
        console.log( action.tableData );
        return state.merge({ exceptionTableData: action.tableData});

        default:
            return state;
    }
};
