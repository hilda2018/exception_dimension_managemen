import React, { PureComponent } from 'react';
import {  Select } from 'antd';
import PropTypes from 'prop-types';
import { actionCreators } from './store';
import { connect } from 'react-redux';

const Option = Select.Option;
class SelectComponen extends PureComponent {
    // 初始化页面常量 绑定事件方法
    constructor(props) {
        super(props);
        this.state = {
            isuse: 'Y', // 是否在异常维护查询显示模式
            arrData: [{ 'key': 'Y','text': '是' },{ 'key': 'N','text': '否' }],
            defaultText: '是',
        };
        this._handleSelecthChange = this._handleSelecthChange.bind(this);
    }

    _handleSelecthChange(val) {
        this.setState({
            isuse: val
        }, () => {
            const postData = {
                'exceptiontypeid': this.props.select_exceptiontypeid ,
                'id': this.props.select_id ,
                'isuse': this.state.isuse
            };
    
            this.props.getSelectExceptionChange(postData);
        });
    }


    render() {
        const { select_exceptiontypeid , select_index ,select_isuse} = this.props;
        const selectOption = this.state.arrData.map((opData) =>
            <Option  key={select_index}
                value={opData.key}>{opData.text}</Option>);

                console.log(this.state.text);
        return(

            <Select
                className={'w36'}
                id = {select_exceptiontypeid}
                defaultValue ={ select_isuse }
                onChange={ this._handleSelecthChange }
            >
                {selectOption}
            </Select>

        );
    }
}

const mapDispatchToProps = (dispatch) => (
    {
        getSelectExceptionChange(postData) {
            dispatch(actionCreators.handlepostSelectChange(postData));
        }
    }
);


export default connect(null,mapDispatchToProps)(SelectComponen);

SelectComponen.propTypes = {
    selectData: PropTypes.object.isRequired,
    select_exceptiontypeid: PropTypes.object.isRequired,
    select_index: PropTypes.object.isRequired,
    id: PropTypes.object.isRequired,
    select_id: PropTypes.object.isRequired,
    getSelectExceptionChange: PropTypes.func
};
