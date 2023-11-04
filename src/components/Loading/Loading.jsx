import classNames from 'classnames/bind';
import styles from './Loading.module.scss';

import loading from '../../assets/images/loading.gif';

const cx = classNames.bind(styles);

const Loading = ({
    isFitMainLayoutContent = false,
    isFitDashboardLayoutContent = false,
    style = {},
}) => {
    return (
        <div
            className={cx('container')}
            style={{
                ...(isFitMainLayoutContent && {
                    height: 'calc(100vh - 64px - 72px - 8px)',
                }),
                ...(isFitDashboardLayoutContent && {
                    height: 'calc(100vh - 64px - 8px)',
                }),
                ...style,
            }}
        >
            <div className={cx('icon')}>
                <img src={loading} alt="Loading icon" />
            </div>
        </div>
    );
};

export default Loading;
