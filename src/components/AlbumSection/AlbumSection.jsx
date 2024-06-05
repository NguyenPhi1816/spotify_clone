import classNames from 'classnames/bind';
import styles from './AlbumSection.module.scss';
import { Link, useLocation, useParams } from 'react-router-dom';
import { useState } from 'react';
import { useEffect } from 'react';
import PlayButton from '../PlayButton';
import FavButton from '../FavButton';
import Button from '../Button';
import Song from '../Song';
import Shelf from '../Shelf';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClock, faFolderOpen } from '@fortawesome/free-solid-svg-icons';
import { getAlbumById } from '../../services/albumServices';
import { getAlbumsSongsByUserId } from '../../services/userServices';
import Loading from '../Loading';

import ShelfItem from '../ShelfItem';
import { songContextTypes, useSongContext } from '../../context/SongContext';
import {
    dialogContextTypes,
    useDialogContext,
} from '../../context/DialogContext';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import SongSkeleton from '../Song/SongSkeleton';
import { MessageType } from '../../dialog/MessageDialog/MessageDialog';

const cx = classNames.bind(styles);

const AlbumSection = () => {
    const HIDDEN_SONG_NUMBERS = 5;
    const DISPLAYED_SONG_NUMBERS = 10;

    const { dispatch: dialogDispatch } = useDialogContext();
    const { state: songState, dispatch: songDispatch } = useSongContext();

    const { id } = useParams();
    const location = useLocation();
    const [data, setData] = useState(null);
    const [artist, setArtist] = useState({});
    const [albums, setAlbums] = useState([]);
    const [numberOfSongs, setNumberOfSongs] = useState(5);
    const [isShowMore, setIsShowMore] = useState(true);
    const [isLoading, setIsLoading] = useState(false);
    const [isPlaying, setIsPlaying] = useState(false);
    const [showDialog, setShowDialog] = useState(false);

    useEffect(() => {
        setIsLoading(true);
        getAlbumById(id)
            .then((res) => {
                setData(res.data);
                setArtist(res.data.user);
            })
            .catch((error) => {
                console.log(error.message);
                dialogDispatch({
                    type: dialogContextTypes.SHOW_MESSAGE_DIALOG,
                    message: {
                        title: 'Có lỗi xảy ra',
                        message: error.message,
                        type: MessageType.ERROR,
                    },
                });
            })
            .finally(() => {
                setIsLoading(false);
            });
    }, [id]);

    useEffect(() => {
        if (artist.id) {
            getAlbumsSongsByUserId(artist.id)
                .then((res) => setAlbums(res.data.albums))
                .catch((error) => {
                    console.log(error.message);
                    dialogDispatch({
                        type: dialogContextTypes.SHOW_MESSAGE_DIALOG,
                        message: {
                            title: 'Có lỗi xảy ra',
                            message: error.message,
                            type: MessageType.ERROR,
                        },
                    });
                });
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

    const handlePlayAlbum = () => {
        if (songState.currentPlayingPath !== location.pathname) {
            console.log('load');
            songDispatch({
                type: songContextTypes.LOAD_SONG,
                currentPlayingPath: location.pathname,
                currentPlayingList: data.songs,
                currentPlayingSongIndex: 0,
            });
        } else {
            if (!songState.isPlaying) {
                songDispatch({ type: songContextTypes.PLAY_SONG });
            } else {
                songDispatch({ type: songContextTypes.PAUSE_SONG });
            }
        }
    };

    useEffect(() => {
        if (songState.currentPlayingPath === location.pathname) {
            setIsPlaying(songState.isPlaying);
        } else {
            setIsPlaying(false);
        }
    });

    return (
        <div className={cx('container')} style={{ height: '100%' }}>
            {isLoading ? (
                <SkeletonTheme
                    baseColor="var(--skeleton-base-color)"
                    highlightColor="var(--skeleton-highlight-color)"
                >
                    <div className={cx('header')}>
                        <div
                            className={cx('background')}
                            style={{
                                backgroundColor: 'var(--skeleton-base-color)',
                            }}
                        ></div>
                        <div className={cx('header-wrapper')}>
                            <Skeleton className={cx('image')}></Skeleton>
                            <div
                                className={cx('info')}
                                style={{ width: '100%' }}
                            >
                                <Skeleton width={'30%'} />
                                <Skeleton
                                    height={'9.6rem'}
                                    style={{ margin: '16px 0' }}
                                />
                                <Skeleton width={'80%'} />
                            </div>
                        </div>
                    </div>
                    <div className={cx('body')}>
                        <div className={cx('list-header')}>
                            <div className={cx('list-header-content')}>
                                <p className={cx('index')}>#</p>
                                <p className={cx('first')}>Tiêu đề</p>
                                <p>Lượt nghe</p>
                                <p>Ngày tạo</p>
                                <div className={cx('last')}>
                                    <FontAwesomeIcon icon={faClock} />
                                    <span> </span>
                                    <span> </span>
                                </div>
                            </div>
                        </div>
                        {new Array(5).fill(0).map((item, index) => (
                            <SongSkeleton key={index} />
                        ))}
                    </div>
                </SkeletonTheme>
            ) : data ? (
                <>
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
                                        src={
                                            data.user &&
                                            data.user.photoImagePath
                                        }
                                        alt={data.user && data.user.fullName}
                                    />
                                    <Link
                                        to={`/artist/${
                                            data.user && data.user.id
                                        }`}
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
                                    <p>
                                        {data.songs && data.songs.length} bài
                                        hát
                                    </p>
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
                                isPlaying={isPlaying}
                                onClick={handlePlayAlbum}
                                className={cx('btn')}
                                size="56px"
                            />
                            <FavButton
                                isActive={false}
                                onClick={() => setShowDialog(true)}
                                className={cx('btn')}
                                size="32px"
                            />
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
                                            style={{
                                                color: 'var(--text-white)',
                                            }}
                                        />
                                        <Button
                                            onClick={() => handleShowMore()}
                                            className={cx('hide-btn', {
                                                'show-btn': !isShowMore,
                                            })}
                                            content="Ẩn bớt"
                                            noBackground
                                            customFontSize="14px"
                                            style={{
                                                color: 'var(--text-white)',
                                            }}
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
                                title={`Các album khác của ${
                                    data.user && data.user.fullName
                                }`}
                                to={`/artist/${artist.id}/album`}
                            >
                                {albums.map((item) => (
                                    <li key={item.id}>
                                        <ShelfItem
                                            shelfItemData={item}
                                            edit={false}
                                            type="album"
                                        />
                                    </li>
                                ))}
                            </Shelf>
                        </div>
                    </div>
                </>
            ) : (
                <div className={cx('placeholder')}>
                    <FontAwesomeIcon
                        icon={faFolderOpen}
                        className={cx('placeholder-icon')}
                    />
                    <h4>Album không tồn tại</h4>
                </div>
            )}
        </div>
    );
};

export default AlbumSection;
