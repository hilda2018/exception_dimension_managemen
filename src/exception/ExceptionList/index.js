import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { Select } from 'antd';
import PropTypes from 'prop-types';
import { actionCreators } from './store';


//组件类 下拉
const Option = Select.Option;
class Selectcomponent extends React.PureComponent {
    // 初始化页面常量 绑定事件方法
    constructor(props) {
        super(props);
        this.state = {
            isuse:'Y'
        };//默认是可以展示
        this._handleSelecthChange = this._handleSelecthChange.bind(this);
    }

    _handleSelecthChange(val) {
       let value = val==='是'?'Y':'N';
       this.setState({
            isuse:value
        },() => {
            const postData = {
                'exceptiontypeid': this.props.exceptiontypeid ,
                'id': this.props.userexceptiontypeid ,
                'isuse': this.state.isuse
            };

            this.props.getSelectExceptionChange(postData);
        });
    }

    render(){
        const {userexceptiontypeid,isuse,exceptiontypeid} = this.props;
        return(
            <Select
                className={'w40'}
                exceptiontypeid = {exceptiontypeid}
                userexceptiontypeid = {userexceptiontypeid}
                defaultValue ={isuse === 'N'?'否':'是'}
                onChange={ this._handleSelecthChange }
            >
                <Option key={'Y'}  value={'Y'}>{'是'}</Option>
                <Option key={'N'}  value={'N'}>{'否'}</Option>
            </Select>);
    }
}

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
    //当 ID 已有值的时候，不发送请求
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

     //console.log('发送异常类型id');
     //console.log(postData);

     this.props.getSelectExceptionChange(postData)
  }

 render(){
   const item = this.props.item;
   const index = this.props.index;

   return (
     <li
         exceptiontypeid = {item.exceptiontypeid}
         isuse={item.isuse}
         title={item.exceptionname}
         userexceptiontypeid={item.id}
         className={'ell  relative'} >

             <div className = {'list-select vm'}>
                 <Selectcomponent
                     className={'w30 vt'}
                     title={item.isuse}
                     userexceptiontypeid = {item.id}
                     isuse = {item.isuse}
                     exceptiontypeid = { item.exceptiontypeid }
                 />
             </div>

             <div
                 className = {'ml14 nowrap ell vm list-text'}    onClick={this.clickExceptionType}
                 title={item.exceptionname}>
                 {item.exceptionname}
             </div>

          </li>
       );
   }
};
//组件类 ul
class ExceptionList extends PureComponent {



    render() {

      const {exceptionData,getSelectExceptionChange} = this.props;

      let list = [];
      exceptionData.forEach(function(item,index){

          item.getSelectExceptionChange=getSelectExceptionChange;
          list.push(< Licomponent  item= {item}  index = {index}
          getSelectExceptionChange = {getSelectExceptionChange}
          />);

      })

      return (
      <div title="异常情况管理列表" className={!exceptionData.length?'nodata-list exception-list':'exception-list'}>
        <h3 className={'f16'} >异常情况管理列表</h3>
        <div className={'exception-list-ctrl'}>
          <div  class="ell  relative list-bordered ">
            <span class="ishownot pad-r-14 display-inline-blo">
              是否展示
            </span>
            <span class="ml14 nowrap w130 display-inline-blo">
              异常情况类型
            </span>
          </div>
          <div className = {!exceptionData.length?'show noData':'hide'}>
              <div className={'table-null'}>暂无数据</div>
          </div>
          <ul className = {exceptionData.length?'show':'hide'}>{list}</ul>
        </div>
      </div>);
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

const mapDispatchToProps = (dispatch) => ({

    getSelectExceptionChange(postData) {//点击触发数据 console.log('postData');
         dispatch(actionCreators.handlepostSelectChange(postData));
    },
    handleExceptionListInit() {
          dispatch(actionCreators.getInitExceptionList());
    }

});




export default connect(mapStateToProps,mapDispatchToProps)(ExceptionList);

ExceptionList.propTypes = {
    exceptionData: PropTypes.object.isRequired,
    table:PropTypes.object.isRequired,
    clickExceptionType: PropTypes.object.isRequired,
    handleExceptionListInit: PropTypes.func
};

Selectcomponent.propTypes = {
    selectData: PropTypes.object.isRequired,
    select_exceptiontypeid: PropTypes.object.isRequired,
    select_index: PropTypes.object.isRequired,
    id: PropTypes.object.isRequired,
    select_id: PropTypes.object.isRequired,
    getSelectExceptionChange: PropTypes.func
};
