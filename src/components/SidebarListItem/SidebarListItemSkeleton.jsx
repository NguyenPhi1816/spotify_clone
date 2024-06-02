import classNames from 'classnames/bind';
import styles from './SidebarListItemSkeleton.module.scss';

import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const cx = classNames.bind(styles);

const SidebarListItemSkeleton = () => {
    return (
        <SkeletonTheme
            baseColor="var(--skeleton-base-color)"
            highlightColor="var(--skeleton-highlight-color)"
        >
            <div className={cx('wrapper')}>
                <div>
                    <Skeleton width={'48px'} height={'48px'} />
                </div>
                <div className={cx('typography')}>
                    <Skeleton count={2} />
                </div>
            </div>
        </SkeletonTheme>
    );
};

export default SidebarListItemSkeleton;
