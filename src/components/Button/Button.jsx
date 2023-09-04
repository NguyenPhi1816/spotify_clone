import classNames from 'classnames/bind';
import styles from './Button.module.scss';

import { Link } from 'react-router-dom';

const cx = classNames.bind(styles);

function Button({
    className,
    href,
    to,
    content = '',
    customFontSize = '16px',
    noBackground = false,
}) {
    let Component = 'button';
    const props = {};

    if (href) {
        props.href = href;
        Component = 'a';
    } else if (to) {
        props.to = to;
        Component = Link;
    }

    return (
        <Component
            className={cx('btn', className)}
            style={
                !noBackground
                    ? {
                          fontSize: customFontSize,
                          padding:
                              customFontSize == '14px'
                                  ? '4px 16px'
                                  : '8px 32px',
                      }
                    : {
                          fontSize: customFontSize,
                          color: 'var(--text-grey)',
                          backgroundColor: 'transparent',
                      }
            }
            {...props}
        >
            {content}
        </Component>
    );
}

export default Button;
