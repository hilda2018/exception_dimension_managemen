import React from 'react';
import PropTypes from 'prop-types';

export default class Text extends React.PureComponent {
    render() {
        const { limit, children } = this.props;
        if (typeof (limit) === 'number' &&
            typeof (children) === 'string' &&
            children.length > limit) {
            return <span title={children}>{children.slice(0, limit) + '...'}</span>;
        }
        return children || null;
    }
}

Text.propTypes = {
    limit: PropTypes.number.isRequired
};

export class NoWrap extends React.PureComponent {
    render() {
        const { children } = this.props;
        if (children) {
            return <span style={{
                whiteSpace: 'nowrap'
            }}>{this.props.children}</span>;
        }
        return null;
    }
}
