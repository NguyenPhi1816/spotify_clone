import { useEffect, useState } from 'react';

import classNames from 'classnames/bind';
import styles from './Shelf.module.scss';

import ShelfItem from '../ShelfItem';

const cx = classNames.bind(styles);

function Shelf({ shelfData = {} }) {
    const [data, setData] = useState({});

    useEffect(() => {
        setData({ ...shelfData });
    }, [shelfData]);

    return (
        <section className={cx('container')}>
            <div className={cx('header')}>
                <h2 className={cx('title')}>{data && data.title}</h2>
                <a href="/">Hiện tất cả</a>
            </div>
            <div>
                <ul className={cx('list')}>
                    {data.items &&
                        data.items.map((item) => (
                            <li key={item.id} className={cx('list-item')}>
                                <ShelfItem shelfItemData={item} />
                            </li>
                        ))}
                </ul>
            </div>
        </section>
    );
}

export default Shelf;
