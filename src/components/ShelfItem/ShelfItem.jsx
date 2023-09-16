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
        <Link to={`/playlist/${data.id}`}>
            <div className={cx('container')}>
                <div className={cx('top')}>
                    <div className={cx('thumb-container')}>
                        <img src={data.image} alt={data.title} />
                    </div>
                    <div className={cx('play-btn')}>
                        <PlayButton size="48px" />
                    </div>
                </div>
                <div>
                    <h3 className={cx('title')}>{data.title}</h3>
                    <p className={cx('desc')}>{data.desc}</p>
                </div>
            </div>
        </Link>
    );
}

export default ShelfItem;
