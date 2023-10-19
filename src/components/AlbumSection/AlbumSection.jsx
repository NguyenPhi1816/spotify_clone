import classNames from 'classnames/bind';
import styles from './AlbumSection.module.scss';
import { Link, useParams } from 'react-router-dom';
import { useState } from 'react';
import { useEffect } from 'react';
import PlayButton from '../PlayButton';
import FavButton from '../FavButton';
import Button from '../Button';
import Song from '../Song';
import Shelf from '../Shelf';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClock } from '@fortawesome/free-solid-svg-icons';
import { getAlbumById } from '../../services/albumServices';
import { getAlbumsSongsByUserId } from '../../services/userServices';

const cx = classNames.bind(styles);

const AlbumSection = () => {
    const HIDDEN_SONG_NUMBERS = 5;
    const DISPLAYED_SONG_NUMBERS = 10;

    const { id } = useParams();
    const [data, setData] = useState({});
    const [artist, setArtist] = useState({});
    const [albums, setAlbums] = useState([]);
    const [numberOfSongs, setNumberOfSongs] = useState(5);
    const [isShowMore, setIsShowMore] = useState(true);

    useEffect(() => {
        getAlbumById(id).then((res) => {
            setData(res.data);
            setArtist(res.data.user);
        });
    }, [id]);

    useEffect(() => {
        if (artist.id) {
            getAlbumsSongsByUserId(artist.id).then((res) =>
                setAlbums(res.data.albums),
            );
        }
    }, [artist.id]);

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
            <div className={cx('header')}>
                <div
                    className={cx('background')}
                    style={{
                        backgroundImage: `url(${data.imagePath})`,
                    }}
                ></div>
                <div className={cx('header-wrapper')}>
                    <img
                        className={cx('image')}
                        src={data.imagePath}
                        alt={data.name}
                    />
                    <div className={cx('info')}>
                        <p>
                            {data.songs && data.songs.length === 1
                                ? 'Đĩa đơn'
                                : 'Album'}
                        </p>
                        <h1>{data.name}</h1>
                        <span>
                            <img
                                src={data.user && data.user.photoImagePath}
                                alt={data.user && data.user.fullName}
                            />
                            <Link
                                to={`/artist/${data.user && data.user.id}`}
                                className={cx('artist', 'link')}
                            >
                                {data.user && data.user.fullName}
                            </Link>
                            <span className={cx('dot')}></span>
                            <p>
                                {data.releaseDate &&
                                    data.releaseDate.substring(6, 11)}
                            </p>
                            <span className={cx('dot')}></span>
                            <p>{data.songs && data.songs.length} bài hát</p>
                            <span className={cx('dot')}></span>
                            <p>{data.totalTime}</p>
                        </span>
                    </div>
                </div>
            </div>
            <div className={cx('body')}>
                <div
                    className={cx('background')}
                    style={{
                        backgroundImage: `url(${data.imagePath})`,
                    }}
                ></div>
                <div className={cx('btns')}>
                    <PlayButton
                        currentListPath={`/album/${data.id}`}
                        currentList={data.songs}
                        currentIndex={0}
                        className={cx('btn')}
                        size="56px"
                    />
                    <FavButton className={cx('btn')} size="32px" />
                </div>
                <div className={cx('song-container')}>
                    <ul className={cx('song-list')}>
                        <li className={cx('list-header')}>
                            <div className={cx('list-header-content')}>
                                <p className={cx('index')}>#</p>
                                <p className={cx('first')}>Tiêu đề</p>
                                <span></span>
                                <span></span>
                                <div className={cx('last')}>
                                    <span> </span>
                                    <FontAwesomeIcon icon={faClock} />
                                    <span> </span>
                                </div>
                            </div>
                        </li>
                        {data.songs &&
                            data.songs
                                .slice(0, numberOfSongs)
                                .map((item, index) => (
                                    <li key={item.id}>
                                        <Song
                                            index={index}
                                            currentList={data.songs}
                                            data={item}
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
                <div className={cx('created-date')}>
                    <p>4 tháng 8, 2023</p>
                </div>
                <div className={cx('artist-album-container')}>
                    <Shelf
                        shelfData={{
                            title: `Các album khác của ${
                                data.user && data.user.fullName
                            }`,
                            playlists: albums,
                        }}
                        itemType="album"
                        showAllLink={`/artist/${artist.id}/album`}
                    />
                </div>
            </div>
        </div>
    );
};

export default AlbumSection;
