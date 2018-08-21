import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import {  List } from 'antd';
import PropTypes from 'prop-types';
import { actionCreators } from './store';
import SelectComponent from './SelectComponent';



//组件类 li
class Licomponent extends React.PureComponent {

  constructor(props) {
      super(props);
      this.state = {
        isShowItem:{}
      };
      this.clickExceptionType = this.clickExceptionType.bind(this);
  }
  clickExceptionType(e){
    // 当 ID 已有值的时候，不发送请求
    e.preventDefault();

    const {item} = this.props ;
    console.log('开始 点击 异常类型');

    const postData = {
        'exceptiontypeid': item.exceptiontypeid,
        'id': item.id ,
        'isuse': item.isuse,
        "pagesize":  20 ,
        "currentpage": 1
     };

      console.log('发送异常类型id');
     console.log(postData);

    //  this.props.getSelectExceptionChange(postData)
  }

 render(){
   const item = this.props.item;
   const index = this.props.index;

   return (
     <li exceptiontypeid = {item.exceptiontypeid}

         id = {item.id}
         isuse={item.isuse}

         className={'ell  relative'} >
             <div className = {'list-select vm'}>
                 <SelectComponent
                     className={'w30 vt'}
                     select_id = {item.id}
                     select_isuse = {item.isuse}
                     select_exceptiontypeid = { item.exceptiontypeid }
                 />
             </div>
             <div className = {'ml14 nowrap ell vm list-text'}    onClick={this.clickExceptionType} >
                 {item.exceptionname} </div>

          </li>
       );
   }
};

class ExceptionList extends PureComponent {



    render() {
        console.log(this.props);
      const {exceptionData,getSelectExceptionChange} = this.props;

        let list = [];
        exceptionData.forEach(function(item,index){
          item.getSelectExceptionChange=getSelectExceptionChange;

          if(index === 0){//第一次的时候。触发
            console.log(22);

          }
          list.push(< Licomponent  item= {item}  index = {index}
          getSelectExceptionChange = {getSelectExceptionChange}
          />);

        })

        console.log('List');
        return (
          <div>
            <div  class="ant-list-item ell  relative list-bordered ">
              <div class="ishownot">是否展示</div><div class="ml14 nowrap">异常情况类型</div>
            </div>
            <ul  >
              {list}
            </ul>

          </div>)

        };



          componentWillMount(){
            this.props.handleExceptionListInit();

            };

}



const mapStateToProps = (state) => (
    {
        exceptionData: state.getIn(['ExceptionList', 'exceptionData']).toJS(),
    }
);


const mapDispatchToProps = (dispatch) => (
    {

    getSelectExceptionChange(postData) {//点击触发数据
         console.log('postData');
      //   dispatch(actionCreators.handlepostSelectChange(postData));
     },
        handleExceptionListInit() {
            dispatch(actionCreators.getInitExceptionList());
        }
    }
);


export default connect(mapStateToProps,mapDispatchToProps)(ExceptionList);

ExceptionList.propTypes = {
    exceptionData: PropTypes.object.isRequired,
    table:PropTypes.object.isRequired,
    clickExceptionType: PropTypes.object.isRequired,
    handleExceptionListInit: PropTypes.func
};
