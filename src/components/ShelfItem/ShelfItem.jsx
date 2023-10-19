import classNames from 'classnames/bind';
import styles from './ShelfItem.module.scss';

import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import PlayButton from '../PlayButton';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen } from '@fortawesome/free-solid-svg-icons';

const cx = classNames.bind(styles);

function ShelfItem({ type, shelfItemData = {}, edit = false }) {
    const [data, setData] = useState({});

    useEffect(() => {
        setData({ ...shelfItemData });
    }, [shelfItemData]);

    return (
        <Link
            to={`/${type}/${data.id}${edit ? '/edit' : ''}`}
            className={cx('link')}
        >
            <div className={cx('container')}>
                <div className={cx('top')}>
                    <div className={cx('thumb-container')}>
                        <img src={data.imagePath} alt={data.name} />
                    </div>
                    <div className={cx('play-btn')}>
                        {!edit && (
                            <PlayButton
                                currentListPath={`/${type}/${data.id}`}
                                currentList={[data]}
                                currentIndex={0}
                                size="48px"
                            />
                        )}
                        {edit && (
                            <button>
                                <FontAwesomeIcon icon={faPen} />
                            </button>
                        )}
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
