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
    gap,
    style,
    onClick,
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
            onClick={onClick}
            className={cx('btn', className)}
            style={{
                ...style,
                fontSize: customFontSize,
                ...(!noBackground
                    ? {
                          padding:
                              customFontSize == '14px'
                                  ? '4px 16px'
                                  : '8px 32px',
                      }
                    : {
                          backgroundColor: 'transparent',
                      }),
                ...(gap ? { marginLeft: gap } : { marginLeft: '0px' }),
            }}
            {...props}
        >
            {content}
        </Component>
    );
}

export default Button;
