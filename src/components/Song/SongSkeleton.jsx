import classNames from 'classnames/bind';
import styles from './DashboardSong.module.scss';

import Skeleton from 'react-loading-skeleton';

const cx = classNames.bind(styles);

const SongSkeleton = () => {
    return (
        <div className={cx('container')}>
            <div className={cx('wrapper')} style={{ display: 'flex' }}>
                <Skeleton
                    className={cx('thumb')}
                    style={{ marginBottom: '6px' }}
                />
                <div style={{ flex: 1 }}>
                    <Skeleton width={'50%'} />
                    <Skeleton width={'80%'} />
                </div>
            </div>
        </div>
    );
};

export default SongSkeleton;
