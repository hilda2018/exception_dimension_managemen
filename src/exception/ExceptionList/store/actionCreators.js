import * as actionTypes from './actionTypes';
import { get } from './../../../comom/get.js';
import { post } from './../../../comom/post.js';


// 初始化 得到 异常类型的列表数据
const getexceptionList = (exceptionData) => ({
    type: actionTypes.INIT_EXCEPTION_LIST_ACTION,
    exceptionData
});

export const getInitExceptionList = () => (dispatch) => {

    //const url = 'tradeexceptiondataAction!getExceptionTypeData.dhtml';
    const url = '/public/api/exceptionListData.json';

    const requestData = get(url);
    let  tableid = '';

    requestData.then((res)  => { return res.json() }).then((json) => {


            console.log(json.data); //  处理json

            dispatch(getexceptionList(json.data));

            console.log('first table');
            // 得到返回数据 ，第一条异常类型的表格
            const item = json.data[0];

            if( !item.id){//id 为空
                  console.log('id为空');
                  let Request =
                  get('/public/api/exceptionListData.json');

                  Request.then((res) => res.json()).then((json) => {
                    json.id='222'
                  //const id = json.id;
                  const getTableDataRequest =    get('/public/api/exceptionListData.json?id='+ json.id);
                  tableid = json.id;

                  console.log(33);
                  console.log('tableid'); console.log(tableid);
                  getTableDataRequest.then((res) => res.json()).then((json) => {
                      json.id = tableid
                      console.log('接收到数据');
                      console.log(json);  //这是表格的右侧数据
                      dispatch(postSelectChange (json));
                      console.log(json);
                  }).catch((err) => { console.log('没有获取到表格数据')})

              }).catch((err) => { console.log('没有获取到id')})


            }
            else{//id 不为空




              console.log('id不为空');
              const getTableDataRequest =    get('tradeuserexceptionAction!loadUserExceptionData.dhtml?id='+ item.id);

              getTableDataRequest.then((res) => res.json()).then((json) => {

                  console.log('接收到数据');
                  console.log(json);  //这是表格的右侧数据
                  dispatch(postSelectChange (json.data));

              }).catch((err) => { console.log('没有获取到表格数据')})

            }


    })
        .catch((error) => {
            console.log('There has been a problem with your fetch operation: ', error.message);
        });
};


// const postData = {
//     'exceptiontypeid': item.exceptiontypeid,
//     'id': item.id ,
//     'isuse': item.isuse,
//     "pagesize":  20 ,
//     "currentpage": 1,
//  };
//
// console.log('发送异常类型postData');
// console.log(postData);
//
// const postDataRequest2 =
// get('/public/api/table1.json?id='+postData.id);
//
// postDataRequest2.then((res) => res.json()).then((json) => {
//
//    //console.log('接收到数据');
// console.log(json);  //这是表格的右侧数据
//
//  //  console.log('json.data');
//    dispatch(postSelectChange (json.data));
//
// })
//





// 下拉选择改变  返回表格的右侧数据

const postSelectChange = (tableData) => (
    {
        type: actionTypes.SELECT_CHANGE_ACTION,
        tableData
    }
);

export const handlepostSelectChange = (postData) => (dispatch) => {
  console.log('postData.id');
  console.log(postData.id);

//tradeuserexceptionAction!loadUserExceptionData.dhtml
    if(postData.id !== ''){ // 不再发送 获取ID请求

    const postDataRequest2 =
    get('tradeuserexceptionAction!loadUserExceptionData.dhtml?id='+postData.id);

    postDataRequest2.then((res) => res.json()).then((json) => {

     console.log(json);  //这是表格的右侧数据
        dispatch(postSelectChange (json.data));

    })

  }
  else
  {
    alert('没有id');

          const postDataRequest =
          //      post('tradeexceptiondataAction!saveExceptionType.dhtml', postData);
          // const postDataRequest =
          //   post('/public/api/table1.json', postData);
          postDataRequest.then((res) => res.json()).then((json) => {

           const postDataRequest2 =
           get('tradeuserexceptionAction!loadUserExceptionData.dhtml?id='+ json.id);
          //    const postDataRequest2 =
          //    get('/public/api/table1.json?id=');


           postDataRequest2.then((res) => res.json()).then((json) => {
               console.log('接收到数据，第二次请求');
               dispatch(postSelectChange (json.data));

           });
          })
          .catch((error) => {
              console.log('There has been a problem with your fetch operation: ', error.message);
          });
            //  console.log('发送数据，获取ID，然后在发给后台ID，获取表格数据');
            //  console.log(postData);
    }


};
