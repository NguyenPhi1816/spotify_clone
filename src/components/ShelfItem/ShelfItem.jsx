import classNames from 'classnames/bind';
import styles from './ShelfItem.module.scss';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useState } from 'react';

const cx = classNames.bind(styles);

function ShelfItem({ shelfItemData = {} }) {
    const [data, setData] = useState({});

    useEffect(() => {
        setData({ ...shelfItemData });
    }, [shelfItemData]);

    return (
        <div className={cx('container')}>
            <div className={cx('top')}>
                <div className={cx('thumb-container')}>
                    <img src={data.image} alt={data.title} />
                </div>
                <div className={cx('play-btn')}>
                    <button>
                        <FontAwesomeIcon icon={faPlay} />
                    </button>
                </div>
            </div>
            <div>
                <h3 className={cx('title')}>{data.title}</h3>
                <p className={cx('desc')}>{data.desc}</p>
            </div>
        </div>
    );
}

export default ShelfItem;
