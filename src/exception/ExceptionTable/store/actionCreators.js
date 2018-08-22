import * as actionTypes from './actionTypes';
import { get } from './../../../comom/get.js';
import { post } from './../../../comom/post.js';



/******************初始化 异常维度的数据****************************/

const getdimentionData = (dimentionData) => ({
    type: actionTypes.INIT_EXCEPTION_DIMENTION_ACTION,
    dimentionData
});


export const getInitExceptionDimention = () => (dispatch) => {
    const requestData = get(actionTypes.getdimentionUrl);
    requestData.then((res)  => res.json()).then((json) => {
        dispatch(getdimentionData(json));
    }).catch((error) => {
        console.log('There has been a problem with your fetch operation: 没有获取到维度数据');
    });
};


/******************table 的 增 删 改 ****************************/

const handleModifyData = (modifyData) => ({
    type: actionTypes.HANDLE_TABLE_ACTION,
    modifyData
});
// 发送数据
export const handleModifyTableData = (modifyData ) => (dispatch) => {

  const postModifyDataUrl =actionTypes.postModifyDataUrl;
  const requestModify = post(postModifyDataUrl,modifyData);

    requestModify.then((res)  => res.json()).then((json) => {
        if(json.result){

            dispatch(handleModifyData(json));
            console.log('获取到最新数据了');
        }

    })
        .catch((error) => {
            console.log('There has been a problem with your fetch operation:没有获取到最新');
        });
};
