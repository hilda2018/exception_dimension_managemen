import * as actionTypes from './actionTypes';
import { get } from './../../../comom/get.js';
import { post } from './../../../comom/post.js';



/******************初始化 异常维度的数据****************************/

const getdimentionData = (dimentionData) => ({
    type: actionTypes.INIT_EXCEPTION_DIMENTION_ACTION,
    dimentionData
});

export const getInitExceptionDimention = () => (dispatch) => {
//  获取json  tradeexceptiondataAction!getExceptionDownListData.dhtml
  //const requestData = get('/public/api/exceptionDimention.json');
    const url = '/public/api/exceptionDimention.json';
    //  const url = 'tradeexceptiondataAction!getExceptionDownListData.dhtml';


    const requestData = get(url);
    requestData.then((res)  => res.json()).then((json) => {
        dispatch(getdimentionData(json));
    })
        .catch((error) => {
            console.log('There has been a problem with your fetch operation: 没有获取到维度数据');
        });
};


/******************table 的 增 删 改 ****************************/

const handleModifyData = (modifyData) => ({
    type: actionTypes.HANDLE_TABLE_ACTION,
    modifyData
});

export const handleModifyTableData = (modifyData ) => (dispatch) => {

  const url = 'tradeexceptionAction.action!saveExceptionData.dhtml';
  const requestModify = post(url,modifyData);
  
  //const requestModify = get('/public/api/table1.json');

    requestModify.then((res)  => res.json()).then((json) => {

        dispatch(handleModifyData(json));
        console.log('获取到最新数据了');
        // 。成功的话 将数据再刷新一遍

    })
        .catch((error) => {
            console.log('There has been a problem with your fetch operation:没有获取到最新');
        });
};
