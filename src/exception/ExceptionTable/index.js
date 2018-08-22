import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { actionCreators } from './store';
import { fromJS } from 'immutable';
import {message , InputNumber }  from 'antd';
import { Select } from 'antd';
let prevData  = [];

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

        <tr key={record.userexceptionid}
         className={(record.selected?"selected tr-ctrl":"tr-ctrl")}>
          <td className={'border-right tc'}>
              <input type="checkbox" id="checkbox1" name="checkbox"
                checked = {disabled}
                onChange = {(e)=>{
                    this.props.setCheck(this.props.index,e.target.checked);
                }}
              />
              <label htmlfor={'checkbox1'} for={'checkbox1'}  className={'fp-checkbox vm'}></label>
          </td>
          <td>

            <span className={'pr4 border-right mr4 vm'}>产地</span>
            < SelectTableComponent
                  dataIndex={'originOperator'}
                  key={'key_originOperator'}
                  selectDataList = {dimentionData.originOperator}
                  value={record.countrylogicexpression}
                  disabled={disabled}
                  onChange={this.originExpressionChange}
                  selectClass={'w66 vm  mr8'}
              />


              < SelectTableComponent
                  dataIndex={'originOperator'}
                  key={'key_originOperator'}
                  selectClass={'w80 vm  mr8'}
                  disabled={disabled}
                  value={record.countryid}
                  onChange={this.countryidChange}
                  selectDataList = {dimentionData.origin}
               />
          </td>

          <td><span className={'pr4 border-right mr4 vm'}>商品</span>
            < SelectTableComponent
                  dataIndex={'origin'}
                  key={'key_origin'}
                  disabled={disabled}
                  selectClass={'w66 vm  mr8'}
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


          <td><span className={'pr4 border-right mr4 vm'}>时间</span>
            < SelectTableComponent
                  dataIndex={'time'}
                  key={'key_time'}
                  disabled={disabled}
                  selectClass={'w80 vm mr8'}
                  onChange={this.timeExpressionChange}
                  selectDataList = {dimentionData.timeOperator}
                  value={record.timelogicexpression} />

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
        <table className = {'ui-table table-ctrl'} >
          <thead >
              <tr className={'th-ctrl'}>
                  <th className={'tc w40'}  >

                      <input type="checkbox" id="checkAll" name="checkbox"
                      checked={this.props.isCheckAll}
                      onChange={(e)=>{
                          this.props.checkAll(e.target.checked);
                      }}/>
                      <label htmlfor={'checkAll'} for={'checkAll'}  className={'fp-checkbox vm'}></label>

                  </th>
                  <th className={'tc b'} >产地维度</th>
                  <th className={'tc b'} >商品维度</th>
                  <th className={'tc b'} >时间维度</th>
              </tr>
          </thead>

          <tbody>
              <tr className={dataSource.length ?'hide':'show noData'} >
                  <td colspan={'4'}>
                    <div className={'table-null-x'}>
                        <div className={'table-null'}>暂无数据</div>
                    </div>
                  </td>
              </tr>
              {dataSource.map((record,index)=>{
                return (
                  <Trcomponent
                        key={index}
                        record={record}
                        index = {record.id}
                        dimentionData={dimentionData}
                        key = {index}
                        setCheck = {this.props.setCheck}/>
              )})}
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
        this.filterItem = this.filterItem.bind(this);

        this.setCheckAll = this.setCheckAll.bind(this);
        this.setCheck = this.setCheck.bind(this);
        this.remove = this.remove.bind(this);
        this.removeSelect = this.removeSelect.bind(this);

    }

    filterItem(arr,value){
      for( let key in arr){
          for(let i in arr[key]){
              let itemBase = arr[key][i]
              if (i == 'name' && itemBase == value){
                return arr[key]['id'];
              }
          }
      }
    }



    save() {



        if(this.state.isAddDeleEdit === 'Add'){  //新增
          const {dimentionData} = this.props ;
          let  newDatas = this.state.exceptionTableData.filter((record)=>record.status == '0');
          if(!newDatas.length){    return false;  }


           newDatas.map((item) =>{


            item.countryid = this.filterItem(dimentionData.origin,item.countryid);

            item.countrylogicexpression = this.filterItem(dimentionData.originOperator,item.countrylogicexpression);

            item.productid = this.filterItem(dimentionData.product,item.productid);

            item.productlogicexpression = this.filterItem(dimentionData.productOperator,item.productlogicexpression);

            item.timedimensiontype = this.filterItem(dimentionData.time,item.timedimensiontype);

            item.timelogicexpression = this.filterItem(dimentionData.timeOperator,item.timelogicexpression);

            return item;
           });
           console.log('newDatas');console.log(newDatas);
          const modifyData = {
            'userexceptiontypeid':this.props.id,
            'data':JSON.stringify(newDatas),
          }

            this.props.getModifyTableData(modifyData);
        }



    }

    edit() {
      // 实现编辑操作
      const {exceptionTableData} = this.state;

      if(!selectedRowKeys.length) {
          message.error('请至少选择一条数据进行操作');
          return false;
      }


      dataSource.map((item,index) => {
          if(selectedRowKeys.indexOf(index) !== -1) {
              item.rowStatus = '1';
          }else{
              item.rowStatus = '-1';
          }
      });
      prevData = Array.from(dataSource);
      this.setState(
          {
              operating: 'true',
              addStatus: 'false',
              isAddDeleEdit: 'Edit',
              deleteStatus: 'false',
              exceptionTableData: [...exceptionTableData]
          }
      );

    }

    cancle() {

    }

    isCheckAll(){
        let exceptionTableData = this.state.exceptionTableData;
        for(let i = 0; i < data.length; i++){
            if(!data[i].selected){
                return false;
            }
        }
        return true;
    }

    setCheckAll(checked){
        let exceptionTableData = this.state.exceptionTableData.map((val)=>{
           val.selected = checked;
           return val;
        });
        this.setState({
            exceptionTableData
        })
    }

    setCheck(index,checked){
        let exceptionTableData = this.state.exceptionTableData;
        exceptionTableData.forEach((val)=>{
            if(val.id === index){
                val.selected = checked;
            }
        });
        this.setState({
            exceptionTableData
        })
    }

    add() {

      const {exceptionTableData} = this.state;
      const orginArr = this.props.dimentionData.origin;
      const productArr = this.props.dimentionData.product;
      const newData = {
          rowid: 'row' + (exceptionTableData.length + 1),
          key: 'row' + (exceptionTableData.length + 1),
          rowKey: (exceptionTableData.length + 1),
          userexceptionid:this.props.userexceptiontypeid,
          countryid: '秘鲁',
          countrylogicexpression: '等于',
          productid: '火龙果',
          productlogicexpression: '等于',
          timedimensiontype:'出港区时间',
          timecheckday:'2',
          timelogicexpression:'等于',
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

    remove(index){
           let exceptionTableData = this.state.data.filter((val)=>val.id!==index);
           this.setState({
               exceptionTableData
           })
       }
     removeSelect(){
         let exceptionTableData = this.state.data.filter((val)=>!val.selected);
         this.setState({
             exceptionTableData
         })
     }

    componentWillMount() {
        this.props.getdimentionData();
    }


    render() {


        const dimentionData = this.props.dimentionData;
        const {addStatus , deleteStatus , editStatus, operating ,status} = this.state;

        if (this.state.exceptionTableData == '') {
          this.state.exceptionTableData = [...this.props.exceptionTableData]
        }

        return (
          <div  title="异常维度配置面板"   className={!this.state.exceptionTableData.length?'nodata-exception exception-table':'exception-table'} >
              <h3 className={'f16'}>异常维度配置面板</h3>
              <div className={'table-show'} >
                  <div className={'table-operations'}>
                  <button   className={'fp-button-primary mr14 fp-button'}
                      onClick={this.add}  >新增</button>
                  <button  className={'fp-button-primary mr14 fp-button'} disabled={editStatus !== 'true' }
                      onClick={this.edit} >编辑</button>
                  <button  className={'fp-button-primary mr14 fp-button'} disabled={deleteStatus !== 'true' }
                      onClick={this.delete}  >删除</button>
                  <button className={'fp-button-primary mr14 fp-button'}  disabled={operating === 'false' }
                      onClick={this.save}  >保存</button>
                  <button className={'fp-button-primary mr14 fp-button'}  disabled={operating === 'false' }
                      onClick={this.cancle}  >撤销</button>

                  </div>
                  <div  className={'table-container'}  >
                    <Tableinfocomponent
                      id={this.props.id}
                      exceptionTableData ={this.state.exceptionTableData}
                      dimentionData={dimentionData} />
                  </div>
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
