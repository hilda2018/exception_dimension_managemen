import React, { Component } from 'react';
import { Provider } from 'react-redux';
import ExceptionList  from './ExceptionList';
import ExceptionTable  from './ExceptionTable';
import store from './store';
import './Button.css';
import './exception.less';
import './Checkbox.css';
import './Input.css';
class App extends Component {


    render() {
        return (
            <Provider store={store}>
                <div className={'relative exception-management'}>
                    <ExceptionList />
                    <ExceptionTable />
                </div>
            </Provider>
        );
    }



}

export default App;
