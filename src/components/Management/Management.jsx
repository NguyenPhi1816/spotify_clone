import classNames from 'classnames/bind';
import styles from './Management.module.scss';
import { Link, useParams } from 'react-router-dom';
import { useState } from 'react';
import { useEffect } from 'react';
import Button from '../Button';
import Shelf from '../Shelf';
import {
    getAlbumsSongsByUserId,
    getUserById,
} from '../../services/userServices';
import DashboardSong from '../Song/DashboardSong';
import Loading from '../Loading';
import ShelfItem from '../ShelfItem';

const cx = classNames.bind(styles);

const Management = () => {
    const HIDDEN_SONG_NUMBERS = 5;
    const DISPLAYED_SONG_NUMBERS = 10;

    const { id } = useParams();
    const [data, setData] = useState({});
    const [albums, setAlbums] = useState([]);
    const [numberOfSongs, setNumberOfSongs] = useState(5);
    const [isShowMore, setIsShowMore] = useState(true);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        setIsLoading(true);
        getUserById(id).then((res) => {
            setData(res.data);
        });
    }, [id]);

    useEffect(() => {
        getAlbumsSongsByUserId(id).then((res) => {
            setAlbums(res.data.albums);
            setIsLoading(false);
        });
    }, [id]);

    useEffect(() => {
        if (!isShowMore) {
            setNumberOfSongs(DISPLAYED_SONG_NUMBERS);
        } else setNumberOfSongs(HIDDEN_SONG_NUMBERS);
    }, [isShowMore]);

    const handleShowMore = () => {
        setIsShowMore((prev) => !prev);
    };

    return (
        <div className={cx('container')}>
            <div className={cx('body')}>
                {data.songs && data.songs.length > 0 && (
                    <div className={cx('song-container')}>
                        <div className={cx('header')}>
                            <h2>Danh sách bài hát</h2>
                            <Link to={`/management/music/${id}`}>
                                Hiện tất cả
                            </Link>
                        </div>
                        <ul className={cx('song-list')}>
                            {data.songs &&
                                data.songs
                                    .slice(0, numberOfSongs)
                                    .map((item, index) => (
                                        <li key={item.id}>
                                            <DashboardSong
                                                className={cx('song')}
                                                index={index}
                                                data={item}
                                                toggleButton
                                            />
                                        </li>
                                    ))}
                            <li>
                                <div className={cx('show-more')}>
                                    <Button
                                        onClick={() => handleShowMore()}
                                        className={cx('hide-btn', {
                                            'show-btn': isShowMore,
                                        })}
                                        content="Xem thêm"
                                        noBackground
                                        customFontSize="14px"
                                        style={{ color: 'var(--text-white)' }}
                                    />
                                    <Button
                                        onClick={() => handleShowMore()}
                                        className={cx('hide-btn', {
                                            'show-btn': !isShowMore,
                                        })}
                                        content="Ẩn bớt"
                                        noBackground
                                        customFontSize="14px"
                                        style={{ color: 'var(--text-white)' }}
                                    />
                                </div>
                            </li>
                        </ul>
                    </div>
                )}
                {albums.length > 0 && (
                    <div className={cx('artist-album-container')}>
                        <Shelf
                            title="Danh sách album"
                            to={`/management/album/${id}`}
                        >
                            {albums.map((item) => (
                                <li key={item.id}>
                                    <ShelfItem
                                        shelfItemData={item}
                                        edit={true}
                                        type="album"
                                    />
                                </li>
                            ))}
                        </Shelf>
                    </div>
                )}
            </div>
            {isLoading && <Loading />}
        </div>
    );
};

export default Management;
