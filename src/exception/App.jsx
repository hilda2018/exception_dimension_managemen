import React, { Component } from 'react';
import { Provider } from 'react-redux';
import ExceptionList  from './ExceptionList';
import ExceptionTable  from './ExceptionTable';
import store from './store';
import { Card } from 'antd';
import './exception.less';


class App extends Component {
    render() {
        return (
            <Provider store={store}>
                <div className={'relative exception-management'}>
                    <Card title="异常情况管理列表" className={'exception-list'}>
                        <ExceptionList />
                    </Card>
                    <Card title="异常情况管理列表"  className={'exception-table'} >

                        <div><ExceptionTable /></div>
                    </Card>

                </div>
            </Provider>
        );
    }
}

export default App;
