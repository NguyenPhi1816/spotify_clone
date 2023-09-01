import classNames from 'classnames/bind';
import styles from './Button.module.scss';

const cx = classNames.bind(styles);

function Button({
    content = '',
    customFontSize = '16px',
    noBackground = false,
}) {
    return (
        <button
            className={cx('btn')}
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
        >
            {content}
        </button>
    );
}

export default Button;
