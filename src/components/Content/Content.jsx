import { useEffect, useState } from 'react';

import classNames from 'classnames/bind';
import styles from './Content.module.scss';

import Shelf from '../Shelf';
import ShelfItem from '../ShelfItem';
import ShelfSkeleton from '../Shelf/ShelfSkeleton';

const cx = classNames.bind(styles);

function Content({ title, data, showSkeleton }) {
    return (
        <section className={cx('section')}>
            {title && (
                <div className={cx('title')}>
                    <h1>{title}</h1>
                </div>
            )}
            <div className={cx('container')}>
                {!showSkeleton ? (
                    data &&
                    data.map((item) => (
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
                    ))
                ) : (
                    <div>
                        <ShelfSkeleton />
                        <ShelfSkeleton />
                    </div>
                )}
            </div>
        </section>
    );
}

export default Content;
