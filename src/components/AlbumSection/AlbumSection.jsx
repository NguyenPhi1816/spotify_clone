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
import { faClock } from '@fortawesome/free-solid-svg-icons';
import { getAlbumById } from '../../services/albumServices';
import { getAlbumsSongsByUserId } from '../../services/userServices';
import Loading from '../Loading';
import { type, useAppContext } from '../../Context/Context';
import MessageDialog from '../../dialog/MessageDialog';
import { types } from '../../dialog/MessageDialog/MessageDialog';
import ShelfItem from '../ShelfItem';

const cx = classNames.bind(styles);

const AlbumSection = () => {
    const HIDDEN_SONG_NUMBERS = 5;
    const DISPLAYED_SONG_NUMBERS = 10;

    const { id } = useParams();
    const location = useLocation();
    const { state, dispatch } = useAppContext();
    const [data, setData] = useState({});
    const [artist, setArtist] = useState({});
    const [albums, setAlbums] = useState([]);
    const [numberOfSongs, setNumberOfSongs] = useState(5);
    const [isShowMore, setIsShowMore] = useState(true);
    const [isLoading, setIsLoading] = useState(false);
    const [isPlaying, setIsPlaying] = useState(false);
    const [showDialog, setShowDialog] = useState(false);

    useEffect(() => {
        setIsLoading(true);
        getAlbumById(id).then((res) => {
            setData(res.data);
            setArtist(res.data.user);
            setIsLoading(false);
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

    const handlePlayAlbum = () => {
        if (state.currentPlayingPath !== location.pathname) {
            console.log('load');
            dispatch({
                type: type.LOAD_SONG,
                currentPlayingPath: location.pathname,
                currentPlayingList: data.songs,
                currentPlayingSongIndex: 0,
            });
        } else {
            if (!state.isPlaying) {
                dispatch({ type: type.PLAY_SONG });
            } else {
                dispatch({ type: type.PAUSE_SONG });
            }
        }
    };

    useEffect(() => {
        if (state.currentPlayingPath === location.pathname) {
            setIsPlaying(state.isPlaying);
        } else {
            setIsPlaying(false);
        }
    });

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
            {isLoading && <Loading isFitMainLayoutContent />}
            {showDialog && (
                <MessageDialog
                    type={types.INFORMATION}
                    message={'Tính năng đang được phát triển'}
                    setShow={setShowDialog}
                />
            )}
        </div>
    );
};

export default AlbumSection;
