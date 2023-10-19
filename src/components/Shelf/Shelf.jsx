import { useEffect, useLayoutEffect, useRef, useState } from 'react';

import classNames from 'classnames/bind';
import styles from './Shelf.module.scss';

import ShelfItem from '../ShelfItem';
import { Link } from 'react-router-dom';

const cx = classNames.bind(styles);

function Shelf({ shelfData, itemType, showAllLink = null, editShelf = false }) {
    let ref = useRef(null);

    const [data, setData] = useState({});
    const [containerWidth, setContainerWidth] = useState(0);

    useEffect(() => {
        setData({ ...shelfData });
    }, [shelfData]);

    useLayoutEffect(() => {
        setContainerWidth(ref.current.offsetWidth);
    }, []);

    return (
        <section className={cx('container')} ref={ref}>
            <div className={cx('header')}>
                <h2 className={cx('title')}>{data && data.title}</h2>
                <Link
                    to={
                        showAllLink === null
                            ? `/section/${data.id}`
                            : showAllLink
                    }
                >
                    Hiện tất cả
                </Link>
            </div>
            <div>
                <ul
                    className={cx('list')}
                    style={{
                        gridTemplateColumns: `repeat(${Math.floor(
                            containerWidth / 200,
                        )}, 1fr)`,
                    }}
                >
                    {data.playlists &&
                        data.playlists.map((item) => (
                            <li key={item.id} className={cx('list-item')}>
                                <ShelfItem
                                    shelfItemData={item}
                                    edit={editShelf}
                                    type={itemType}
                                />
                            </li>
                        ))}
                </ul>
            </div>
        </section>
    );
}

export default Shelf;
