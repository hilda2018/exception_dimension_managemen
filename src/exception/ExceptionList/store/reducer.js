import { fromJS } from 'immutable';
import * as actionTypes from './actionTypes';


/*********** 异常类型下拉 store  初始化 ****************/
const defaultState = fromJS({  // 初始化 store ，store的数据结构
    exceptionData: [], //getExceptionData: [] 是异常情况类型列表数据
    exceptionTableData:[],
    id:'',
});

export default (state = defaultState, action) => {

    switch(action.type) {

  /*********** 得到下拉数据  ****************/
        case  actionTypes.INIT_EXCEPTION_LIST_ACTION :

            return state.merge({
              exceptionData: action.exceptionData
            });

/*********** 是否展示select 改变触发的事件  ****************/
        case  actionTypes.SELECT_CHANGE_ACTION:
            console.log(action.tableData);
            return state.merge({
              exceptionTableData: action.tableData.data,
              id: action.tableData.id
            });

/*********** 保存id ****************/
        case  actionTypes.SAVE_EXCEPTION_ID_ACTION:

            return state.merge({
              id: action.exceptionTypeId
            });
      default:
          return state;
    }
};
