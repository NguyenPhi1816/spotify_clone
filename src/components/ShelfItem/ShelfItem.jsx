import classNames from 'classnames/bind';
import styles from './ShelfItem.module.scss';

import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import PlayButton from '../PlayButton';

const cx = classNames.bind(styles);

function ShelfItem({ shelfItemData = {} }) {
    const [data, setData] = useState({});

    useEffect(() => {
        setData({ ...shelfItemData });
    }, [shelfItemData]);

    return (
        <Link to={`/playlist/${data.id}`} className={cx('link')}>
            <div className={cx('container')}>
                <div className={cx('top')}>
                    <div className={cx('thumb-container')}>
                        <img src={data.imagePath} alt={data.name} />
                    </div>
                    <div className={cx('play-btn')}>
                        <PlayButton size="48px" />
                    </div>
                </div>
                <div className={cx('body')}>
                    <h3 className={cx('title')}>{data.name}</h3>
                    <p className={cx('desc')}>{data.description}</p>
                </div>
            </div>
        </Link>
    );
}

export default ShelfItem;
