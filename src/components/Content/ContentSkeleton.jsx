import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class Skeleton extends Component {
    preLoader() {
        let preloaders = [];
        let elementStyle = {
            background:
                'linear-gradient(to right, ' + this.props.color + ', #f7f7f7)',
        };
        for (let index = 0; index < 3; index++) {
            preloaders.push(
                <div
                    key={index}
                    className="element"
                    style={elementStyle}
                ></div>,
            );
        }
        return preloaders;
    }

    loaderRows() {
        const rows = [];
        for (let index = 0; index < this.props.count; index++) {
            rows.push(
                <div key={index} className="skeleton">
                    {this.preLoader()}
                </div>,
            );
        }
        return rows;
    }

    render() {
        return <div>{this.loaderRows()}</div>;
    }

    static propTypes = {
        color: PropTypes.string,
        count: PropTypes.number,
    };

    static defaultProps = {
        count: 1,
        color: '#f4f4f4',
    };
}
