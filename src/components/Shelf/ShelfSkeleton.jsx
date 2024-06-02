import classNames from 'classnames/bind';
import styles from './ShelfSkeleton.module.scss';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';

const cx = classNames.bind(styles);

const ShelfSkeleton = () => {
    return (
        <SkeletonTheme
            baseColor="var(--skeleton-base-color)"
            highlightColor="var(--skeleton-highlight-color)"
        >
            <Skeleton
                className={cx('title', 'm-8')}
                baseColor="var(--background-base)"
                width={'40%'}
                height={'24px'}
            />
            <div className={cx('container')}>
                {new Array(5).fill(0).map((item, index) => (
                    <div className={cx('item')} key={index}>
                        <Skeleton width={'100%'} height={'60%'} />
                        <Skeleton width={'60%'} className={cx('title')} />
                        <Skeleton />
                        <Skeleton width={'80%'} />
                    </div>
                ))}
            </div>
        </SkeletonTheme>
    );
};

export default ShelfSkeleton;
