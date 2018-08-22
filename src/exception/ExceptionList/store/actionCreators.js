import * as actionTypes from './actionTypes';
import { get } from './../../../comom/get.js';
import { post } from './../../../comom/post.js';

// 下拉选择改变  返回表格的右侧数据

const postSelectChange = (tableData) => (
    {
        type: actionTypes.SELECT_CHANGE_ACTION,
        tableData
    }
);



// 根据 userexceptiontypeid id  获取表格数据
export const userexceptiontypeidToGetTableData = (userexceptiontypeid) => (dispatch) => {
  console.log('有id，可直接求表格数据');
    const requestTableDataUrl = actionTypes.requestTableDataUrl;
  console.log('有id，可直接求表格数据');
    const userexceptiontypeRequest =
    get(requestTableDataUrl+'?id='+ userexceptiontypeid);
  console.log('有id，可直接求表格数据');
    userexceptiontypeRequest.then((res) => res.json()).then((json) => {
    console.log('//这是表格的右侧数据')
    console.log(json);
        dispatch(postSelectChange (json.data));

    }).catch((err) => { console.log('没有获取到表格数据')})

}

// 有id，可直接求表格数据 ，无id，求id，再求表格数据
export let handlepostSelectChange = (postData)  => (dispatch) => {
  console.log('postData.id');
  console.log(postData.id);

      //没有id
      if( !postData.id ){
          //alert('没有id');
          console.log('id为空');
          //发起请求，获得id
          const postData2 = {
              'exceptiontypeid': postData.select_exceptiontypeid ,
              'id': postData.id,
              'isuse': postData.isuse,
              'pagesize':  20 ,
              'currentpage': 1
          };
          //得到 id↓ 求表格数据
          getExceptionId(postData2);
      }
      else
      {
        console.log('有id，可直接求表格数据');
          // 有id，可直接求表格数据
          const id=postData.id;
          const requestTableDataUrl = actionTypes.requestTableDataUrl;
        console.log('有id，可直接求表格数据');
          const userexceptiontypeRequest =
          get(requestTableDataUrl+'?id='+ id);
        console.log('有id，可直接求表格数据');
          userexceptiontypeRequest.then((res) => res.json()).then((json) => {

            if(json.result){
              const tableData = {
                data:json.data,
                id:id
              }

              dispatch(postSelectChange (tableData));
            }else{
              alert('后台出错');
            }


          }).catch((err) => { console.log('没有获取到表格数据')})
      }

};



// 初始化 得到 异常类型的列表数据
const getexceptionList = (exceptionData) => ({
    type: actionTypes.INIT_EXCEPTION_LIST_ACTION,
    exceptionData
});


// 初始化 得到 异常类型的列表数据
const saveExceptiodnTypeId = (exceptionTypeId) => ({
    type: actionTypes.SAVE_EXCEPTION_ID_ACTION,
    exceptionTypeId
});

//异常维度数据（左侧）的请求
export const getInitExceptionList = () => (dispatch) => {

    const url = actionTypes.getInitListurl;
    const getInitListRequest = get(url);

    //为了记录异常类型的id，映射出相应的表格
    getInitListRequest.then((res) => { return res.json() }).then((json) => {
      // 得到返回数据 ↓
    dispatch(getexceptionList(json.data));
   //  ↓
   // 求得  第一条异常类型的表格
    const item = json.data[0];
    // 当id 不存在的时候
    if( !item.id){
        console.log('id为空');
        //发起请求，获得id
        const postData = {
            'exceptiontypeid': item.select_exceptiontypeid ,
            'id': item.id,
            'isuse': item.isuse,
            'pagesize':  20 ,
            'currentpage': 1
        };
        //得到 id↓ 求表格数据

        getExceptionId(postData);

    }else{


        dispatch(saveExceptiodnTypeId(item.id));
        userexceptiontypeidToGetTableData(item.id);
    }


  })
}


// 得到id值
export const getExceptionId = (postData) => (dispatch) => {

  const saveExceptionUrl = actionTypes.saveExceptionUrl;
  const postDataRequest =  post(saveExceptionUrl , postData);
  postDataRequest.then((res) => res.json()).then((json) => {
    // 有id，可直接求表格数据
    dispatch(saveExceptiodnTypeId(json.id));
    userexceptiontypeidToGetTableData(json.id);

  }).catch((err) => { console.log('没有获取到表格数据')})

}
