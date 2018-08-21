import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { actionCreators } from './store';
import { fromJS } from 'immutable';
import {Table, Button,message , Select , InputNumber }  from 'antd';


let prevData  = [];
const { Column} = Table;
const Option = Select.Option;


class SelectTableComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: ''
        };
      this.forIn = this.forIn.bind(this);
    }


    forIn(arr){
      let selectOption =[]
      for(let key in arr){
         selectOption.push(
           <Option  key={arr[key].id} value={arr[key].id}>{arr[key].name}</Option>
         );
      }

      return selectOption
    }


    onSelectChange ()
    { this.state.value1 = value }

    render() {
      const {value,selectDataList,disabled,selectClass } = this.props;
      const selectOption = this.forIn(selectDataList);
      return (
        <Select
            onChange = {this.onSelect1Change}
            defaultValue={value}
            className ={selectClass}
            disabled={disabled}>
              {selectOption}
        </Select>
      ) ;
    }

}

//组件类 tr
class Trcomponent extends React.PureComponent {
  constructor(props) {
      super(props);
      this.state = {
        timecheckday:'',
        countrylogicexpression:'',
        countryid:'',
        productlogicexpression:'',
        productid:'',
        tiemlogicexpression:'',
        timedimensiontype:''
      };
      this.originExpressionChange = this.originExpressionChange.bind(this);
      this.countryidChange = this.countryidChange.bind(this);
      this.productExpressionChange= this.productExpressionChange.bind(this);
      this.productNameChange= this.productNameChange.bind(this);
      this.triggerChange =  this.triggerChange.bind(this);
      this.timeNameChange=this.timeNameChange.bind(this);
      this.timeExpressionChange=this.timeExpressionChange.bind(this);
      this.inputNameChange =  this.inputNameChange.bind(this);
  }

  // 回写input的值
  triggerChange(changedValue){
    // Should provide an event to pass value to Form.
    const onChange = this.props.onChange;
    if (onChange) {
      onChange(Object.assign({}, this.state, changedValue));
    }
  }

  // 处理 number 输入框input的值
  inputNameChange(e){
    const timecheckday = e.target.value;
    if (!('value' in this.props.record)) {
        this.setState({timecheckday});
    }
    console.log(timecheckday);
    this.props.record.timecheckday = e.target.value;
    this.triggerChange({timecheckday});
  }


 //
  originExpressionChange(e){
    const countrylogicexpression = e.target.value;
    if (!('value' in this.props.record)) {
        this.setState({countrylogicexpression});
    }
    console.log(countrylogicexpression);
    record.countrylogicexpression = e.target.value;
    this.triggerChange({countrylogicexpression});
  }


//
  countryidChange(e){
    const countryid = e.target.value;
    if (!('value' in this.props.record)) {
        this.setState({countryid});
    }
    console.log(countryid);
    this.props.record.countryid= e.target.value;
    this.triggerChange({countryid});
  }

//

  productExpressionChange(e){
    const productlogicexpression = e.target.value;
    if (!('value' in this.props.record)) {
        this.setState({productlogicexpression});
    }
    console.log(productlogicexpression);
    this.props.record.productlogicexpression = e.target.value;
    this.triggerChange({productlogicexpression});
  }


//
  productNameChange(e){
    const productid = e.target.value;
    if (!('value' in this.props.record)) {
        this.setState({productid});
    }

    this.props.record.productid = e.target.value;
    console.log(productid);
    this.triggerChange({productid});
  }


//
   timeNameChange(e){
     const timedimensiontype = e.target.value;
     if (!('value' in this.props.record)) {
         this.setState({timedimensiontype});
     }

     this.props.record.timedimensiontype = e.target.value;
     console.log(timedimensiontype);
     this.triggerChange({timedimensiontype});
   }


//

timeExpressionChange(e){
  const tiemlogicexpression = e.target.value;
  if (!('value' in this.props.record)) {
      this.setState({tiemlogicexpression});
  }
  console.log(tiemlogicexpression);
  this.triggerChange({tiemlogicexpression});

}


 render(){

   const {dimentionData,record}= this.props;

   // 控制是否能被编辑
   const disabled = (record.status=== '0' ||   record.status=== '1') ? false : true;

   return (

        <tr className = {'tr-ctrl'} key={record.userexceptionid} id={record.userexceptionid}
         className={(record.selected?"selected":"")}

         >
          <td className={'border-right'}>
          <input type="checkbox" id="mixChk3"
              checked = {record.selected}
              onChange = {(e)=>{
                  this.props.setCheck(this.props.index,e.target.checked);
              }}
           />
          <label class="ui-checkbox" for="mixChk3"></label>
          </td>
          <td>

            <span className={'mr8'}> 产地 </span>
            < SelectTableComponent
                  dataIndex={'originOperator'}
                  key={'key_originOperator'}
                  selectDataList = {dimentionData.originOperator}
                  value={record.countrylogicexpression}
                  disabled={disabled}
                  onChange={this.originExpressionChange}
                  selectClass={'w80 vm  mr8'}
              />


              < SelectTableComponent
                  dataIndex={'originOperator'}
                  key={'key_originOperator'}
                  selectClass2={'w80 vm  mr8'}
                  disabled={disabled}
                  value={record.countryid}
                  onChange={this.countryidChange}
                  selectDataList = {dimentionData.origin}
               />
          </td>

          <td><span className={'mr8'}> 产地 </span>
            < SelectTableComponent
                  dataIndex={'origin'}
                  key={'key_origin'}
                  disabled={disabled}
                  selectClass={'w80 vm  mr8'}
                  onChange={this.productExpressionChange}
                  value={record.productlogicexpression}
                  selectDataList = {dimentionData.productOperator}

              />
              < SelectTableComponent
                  dataIndex={'timeOperator'}
                  key={'key_timeOperator'}
                  disabled={disabled}
                  selectClass={'w80 vm  mr8'}
                  onChange={this.productNameChange}
                  selectDataList = {dimentionData.product}
                  value={record.productid} />
          </td>


          <td><span className={'mr8'}> 产地 </span>
            < SelectTableComponent
                  dataIndex={'time'}
                  key={'key_time'}
                  disabled={disabled}
                  selectClass={'w80 vm mr8'}
                  onChange={this.timeExpressionChange}
                  selectDataList = {dimentionData.timeOperator}
                  value={record.tiemlogicexpression} />

              < SelectTableComponent
                  dataIndex={'time'}
                  key={'key_time'}
                  disabled={disabled}
                  selectClass={'w120 vm  mr8'}
                  onChange={this.timeNameChange}
                  selectDataList = {dimentionData.time}
                  value={record.timedimensiontype}
               />

               <InputNumber min={0} max={30} step={1} value={record.timecheckday} disabled={disabled}
               onChange={this.inputNameChange}
                />
          </td>
        </tr>);
   }
};


//组件类 table
class Tableinfocomponent extends React.PureComponent  {
  render(){

      const {dimentionData } = this.props;

      const dataSource  = this.props.exceptionTableData;

    //  console.log(dimentionData); //获得维度基础数据
    //  console.log(dataSource);//获得表格的 展示数据



      return (
        <table className = {'ui-table table-ctrl'}
        style={{
            display: dataSource.length?"table":"none"
        }}
         >
          <thead >
              <tr className={'th-ctrl'}>
                  <th className={'tc'}  >
                      <input type="checkbox"  id="checkAll"        checked={this.props.isCheckAll}
                      onChange={(e)=>{
                          this.props.checkAll(e.target.checked);
                      }}  />
                    <label class="ui-checkbox" for="checkAll"  htmlFor="checkAll" ></label>
                  </th>
                  <th className={'tc'}  ><span>序号</span></th>
                  <th className={'tc'} ><span>发货日期</span></th>
                  <th className={'tc'} ><span>订单号</span></th>
              </tr>
          </thead>

          <tbody>
              {dataSource.map((record,index)=>{
                  return (<Trcomponent
                          key={index}
                          record={record}
                          index = {record.id}
                           dimentionData={dimentionData}
                           key = {index}
                          setCheck = {this.props.setCheck}
                        />)
              })}
          </tbody>
        </table>);
  }
};

class ExceptionTable extends Component {


    constructor(props) {;
        super(props);
        this.state = {
            selectedRows: [],
            selectedRowKeys: '',
            operating: 'false',
            addStatus: 'true',
            isAddDeleEdit: '',
            deleteStatus: 'true',
            editStatus: 'true',
            exceptionTableData: ''
        };

        this.save = this.save.bind(this);
        this.edit = this.edit.bind(this);
        this.add = this.add.bind(this);
        this.cancle = this.cancle.bind(this);
        this.delete = this.delete.bind(this);
    }



    save() {
        console.log('this.state.exceptionTableData');
        console.log(this.state.exceptionTableData);


        if(this.state.isAddDeleEdit === 'Add'){  //新增

          let  newDatas = this.state.exceptionTableData.filter((record)=>record.status == '0');
          if(!newDatas.length){    return false;  }

          console.log(newDatas);
          const modifyData = {
            'userexceptiontypeid':this.props.id,
            'data':newDatas[0],
            'result':true,
            'msg':'成功'

          }
            console.log(modifyData);
            this.props.getModifyTableData(modifyData);
        }



    }

    edit() {
        // 实现编辑操作
        // operating: 'true',
        // deleteStatus: 'false',
        // editStatus: 'false',
        // isAddDeleEdit: 'Add',
        // if( this.operating === true ){
        //
        // }

    }

    cancle() {

    }



    add() {

      const {exceptionTableData} = this.state;

      const newData = {
          rowid: 'row' + (exceptionTableData.length + 1),
          key: 'row' + (exceptionTableData.length + 1),
          rowKey: (exceptionTableData.length + 1),
          rowid: 'row1' ,
          rowKey: 1,
          userexceptionid:'userexceptionid'+(exceptionTableData.length + 1),
          countryid: '全部',
          countrylogicexpression: '等于',
          productid: '全部',
          productlogicexpression: '等于',
          timedimensiontype: '实际发货时间',
          timecheckday:'2',
          tiemlogicexpression: '等于',
          status: '0',//-1 normal ,0 新增 1，编辑 2，删除,
          selected:true,
      };


      this.setState({
          operating: 'true',
          deleteStatus: 'false',
          editStatus: 'false',
          isAddDeleEdit: 'Add',
          exceptionTableData: [...exceptionTableData, newData]
      });

    }

    delete() {

    }



    componentWillMount() {
        this.props.getdimentionData();
    }


    render() {


        const dimentionData = this.props.dimentionData;
        const {  addStatus , deleteStatus , editStatus, operating ,status} = this.state;
      //  console.log(this.props.exceptionTableData);
        if (this.state.exceptionTableData == '') {
          this.state.exceptionTableData = [...this.props.exceptionTableData]
        }

        return (
          <div className={'table-show'} >
              <div className={'table-operations'}>
              <Button type='primary'  disabled={addStatus !== 'true' }
                  onClick={this.add} className={'mr14 mb14'} >新增</Button>
              <Button type='primary' disabled={editStatus !== 'true' }
                  onClick={this.edit} className={'mr14 mb14'} >编辑</Button>
              <Button type='primary'  disabled={deleteStatus !== 'true' }
                  onClick={this.delete} className={'mr14 mb14'} >删除</Button>
              <Button type='primary'  disabled={operating === 'false' }
                  onClick={this.save} className={'mr14 mb14'} >保存</Button>
              <Button type='primary'  disabled={operating === 'false' }
                  onClick={this.cancle} className={'mr14 mb14'} >撤销</Button>

              </div>
              <div  className={'table-container'}  >
                <Tableinfocomponent
                  id={this.props.id}
                  exceptionTableData ={this.state.exceptionTableData}
                  dimentionData={dimentionData} />
              </div>
          </div>
        );
    }





}




const mapStateToProps = (state) => ({
  dimentionData: state.getIn(['ExceptionTable', 'dimentionData']).toJS(),
  exceptionTableData: state.getIn(['ExceptionList', 'exceptionTableData']).toJS(),
  id: state.getIn(['ExceptionList', 'id']),
});


const mapDispatchToProps = (dispatch) => ({
  getdimentionData() {
    dispatch(actionCreators.getInitExceptionDimention());
  },
  getModifyTableData( modifyData ) {

    console.log('modify');    console.log(modifyData);
    dispatch(actionCreators.handleModifyTableData( modifyData ));
  }
});


export default connect(mapStateToProps,mapDispatchToProps)(ExceptionTable);

ExceptionTable.propTypes = {
  dimentionData: PropTypes.object.isRequired,

};

SelectTableComponent.propTypes = {
    record: PropTypes.object.isRequired,
    col: PropTypes.object.isRequired,
    disabled: PropTypes.object.isRequired
};
