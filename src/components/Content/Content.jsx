import { useEffect, useState } from 'react';

import classNames from 'classnames/bind';
import styles from './Content.module.scss';

import Shelf from '../Shelf';
import Loading from '../Loading';
import ShelfItem from '../ShelfItem';

const cx = classNames.bind(styles);

function Content({ title, data }) {
    const [content, setContent] = useState([]);

    useEffect(() => {
        setContent(data);
    }, [data]);

    return (
        <section className={cx('section')}>
            {title && (
                <div className={cx('title')}>
                    <h1>{title}</h1>
                </div>
            )}
            <div className={cx('container')}>
                {content &&
                    content.map((item) => (
                        <Shelf
                            key={item.id}
                            title={item.title}
                            to={`/section/${item.id}`}
                        >
                            {item.playlists.map((playlist) => (
                                <li key={playlist.id}>
                                    <ShelfItem
                                        shelfItemData={playlist}
                                        edit={false}
                                        type="playlist"
                                    />
                                </li>
                            ))}
                        </Shelf>
                    ))}
            </div>
        </section>
    );
}

export default Content;
