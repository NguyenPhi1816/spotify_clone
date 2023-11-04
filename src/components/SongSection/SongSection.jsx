import classNames from 'classnames/bind';
import styles from './SongSection.module.scss';
import { Link, useParams } from 'react-router-dom';
import { useState } from 'react';
import { useEffect } from 'react';
import { getSongById } from '../../services/songServices';
import PlayButton from '../PlayButton';
import FavButton from '../FavButton';
import Button from '../Button';
import Song from '../Song';
import Shelf from '../Shelf';
import { useRef } from 'react';
import { type, useAppContext } from '../../Context/Context';
import { getAlbumById } from '../../services/albumServices';
import { getAlbumsSongsByUserId } from '../../services/userServices';
import Comments from '../Comments';
import Loading from '../Loading';
import {
    addSongToFavPlaylist,
    removeSongFromFavPlaylist,
} from '../../services/playlistServices';
import ShelfItem from '../ShelfItem';

const cx = classNames.bind(styles);

const SongSection = () => {
    const HIDDEN_SONG_NUMBERS = 5;
    const DISPLAYED_SONG_NUMBERS = 10;

    const { id } = useParams();
    const lyricContainerRef = useRef();
    const { state, dispatch } = useAppContext();
    const [data, setData] = useState({});
    const [albums, setAlbums] = useState([]);
    const [songs, setSongs] = useState([]);
    const [mainArtist, setMainArtist] = useState({});
    const [mainAlbum, setMainAlbum] = useState({});
    const [mainAlbumDetail, setMainAlbumDetail] = useState({});
    const [numberOfSongs, setNumberOfSongs] = useState(5);
    const [isShowMore, setIsShowMore] = useState(true);
    const [isLoading, setIsLoading] = useState(false);
    const [isPlaying, setIsPlaying] = useState(false);
    const [isFavSong, setIsFavSong] = useState(false);

    useEffect(() => {
        setIsLoading(true);
        getSongById(id).then((res) => {
            setData(res.data);
            setMainArtist(res.data.users[0]);
            setMainAlbum(res.data.albums[0]);
            setIsLoading(false);
        });
    }, [id]);

    useEffect(() => {
        if (mainAlbum.id) {
            getAlbumById(mainAlbum.id).then((res) =>
                setMainAlbumDetail(res.data),
            );
        }
    }, [mainAlbum.id]);

    useEffect(() => {
        if (mainArtist.id) {
            getAlbumsSongsByUserId(mainArtist.id).then((res) => {
                setSongs(res.data.songs);
                setAlbums(res.data.albums);
            });
        }
    }, [mainArtist.id]);

    useEffect(() => {
        if (state.isAuthenticated)
            lyricContainerRef.current.innerHTML =
                '<h3>Lời bài hát</h3>' + data.lyric;
    }, [data.lyric]);

    useEffect(() => {
        if (!isShowMore) {
            setNumberOfSongs(DISPLAYED_SONG_NUMBERS);
        } else setNumberOfSongs(HIDDEN_SONG_NUMBERS);
    }, [isShowMore]);

    useEffect(() => {
        if (state.likedSongsPlaylist.songs) {
            const [song] = state.likedSongsPlaylist.songs.filter(
                (item) => item.id == id,
            );
            if (!!song) {
                setIsFavSong(true);
            }
        }
    }, [state.likedSongsPlaylist]);

    const handleLikeSong = () => {
        if (!isFavSong) {
            addSongToFavPlaylist(state.authData.user.id, id).then((res) => {
                dispatch({
                    type: type.SET_LIKED_SONGS_PLAYLIST,
                    playlist: res.data,
                });
                setIsFavSong(true);
            });
        } else {
            removeSongFromFavPlaylist(state.authData.user.id, id).then(
                (res) => {
                    if (res.status == 200 && state.likedSongsPlaylist.songs) {
                        const new_songs = state.likedSongsPlaylist.songs.filter(
                            (item) => item.id != id,
                        );
                        const new_playlist = {
                            ...state.likedSongsPlaylist,
                            songs: new_songs,
                        };
                        dispatch({
                            type: type.SET_LIKED_SONGS_PLAYLIST,
                            playlist: new_playlist,
                        });
                        setIsFavSong(false);
                    }
                },
            );
        }
    };

    const handleShowMore = () => {
        setIsShowMore((prev) => !prev);
    };

    const handlePlayList = () => {
        if (state.currentPlayingPath !== location.pathname) {
            console.log('load');
            dispatch({
                type: type.LOAD_SONG,
                currentPlayingPath: location.pathname,
                currentPlayingList: [data],
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
                        <p>Bài hát</p>
                        <h1>{data.name}</h1>
                        <span>
                            <img
                                src={mainArtist.photoImagePath}
                                alt={mainArtist.fullName}
                            />
                            <Link
                                to={`/artist/${mainArtist.id}`}
                                className={cx('artist', 'link')}
                            >
                                {mainArtist.fullName}
                            </Link>
                            <span className={cx('dot')}></span>
                            <Link
                                className={cx('link')}
                                to={`/album/${mainAlbum.id}`}
                            >
                                {mainAlbum.name}
                            </Link>
                            <span className={cx('dot')}></span>
                            <p>
                                {data.releaseDate &&
                                    data.releaseDate.substring(7, 11)}
                            </p>
                            <span className={cx('dot')}></span>
                            <p>{data.duration}</p>
                            <span className={cx('dot')}></span>
                            <p>{data.viewCount}</p>
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
                        onClick={(e) => handlePlayList(e)}
                        className={cx('btn')}
                        size="56px"
                    />
                    <FavButton
                        onClick={handleLikeSong}
                        isActive={isFavSong}
                        className={cx('btn')}
                        size="32px"
                    />
                </div>
                <div
                    className={cx('lyric-artist')}
                    style={{
                        flexDirection: state.isAuthenticated ? 'row' : 'column',
                    }}
                >
                    <div
                        className={cx('lyrics-container')}
                        ref={lyricContainerRef}
                    >
                        {!state.isAuthenticated && (
                            <div className={cx('activation-trigger')}>
                                <p>
                                    Đăng nhập để xem lời bài hát và nghe toàn bộ
                                    bản nhạc
                                </p>
                                <div className={cx('register-login')}>
                                    <div className={cx('btn')}>
                                        <Button
                                            style={{
                                                color: 'var(--text-white)',
                                            }}
                                            content="Đăng ký"
                                            noBackground
                                        />
                                    </div>
                                    <div className={cx('btn')}>
                                        <Button
                                            content="Đăng nhập"
                                            gap="32px"
                                        />
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                    <div className={cx('artist-container')}>
                        <div className={cx('artist-container-header')}>
                            <h3>Nghệ sĩ</h3>
                        </div>
                        <ul>
                            {data.users &&
                                data.users.map((user) => (
                                    <li key={user.id}>
                                        <div className={cx('artist')}>
                                            <img
                                                className={cx('artist-img')}
                                                src={user.photoImagePath}
                                                alt={user.fullName}
                                            />
                                            <div className={cx('artist-info')}>
                                                <p>Nghệ sĩ</p>
                                                <Link
                                                    className={cx('link')}
                                                    to={`/artist/${user.id}`}
                                                >
                                                    {user.fullName}
                                                </Link>
                                            </div>
                                        </div>
                                    </li>
                                ))}
                        </ul>
                    </div>
                </div>
                <div className={cx('song-container')}>
                    <p>Các bản nhạc thịnh hành của</p>
                    <h3>{mainArtist.fullName}</h3>
                    <ul className={cx('song-list')}>
                        {songs.slice(0, numberOfSongs).map((item, index) => (
                            <li key={item.id}>
                                <Song
                                    index={index}
                                    currentList={songs}
                                    data={item}
                                    showStreamCount
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
                <div className={cx('artist-album-container')}>
                    <Shelf
                        title={`Các bản phát thịnh hành của ${
                            mainArtist && mainArtist.fullName
                        }`}
                        to={`/artist/${mainArtist.id}/album`}
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
                <div className={cx('album-container')}>
                    <div className={cx('album-container-header')}>
                        <img
                            src={mainAlbumDetail.imagePath}
                            alt={mainAlbumDetail.name}
                        />
                        <div>
                            <p>
                                Từ{' '}
                                {mainAlbumDetail.songs &&
                                mainAlbumDetail.songs.length === 1
                                    ? 'đĩa đơn'
                                    : 'album'}
                            </p>
                            <Link
                                className={cx('link')}
                                to={`/album/${mainAlbumDetail.id}`}
                            >
                                {mainAlbumDetail.name}
                            </Link>
                        </div>
                    </div>
                    <div className={cx('album-container-body')}>
                        <ul className={cx('song-list')}>
                            {mainAlbumDetail.songs &&
                                mainAlbumDetail.songs.map((item, index) => (
                                    <li key={item.id}>
                                        <Song
                                            className={cx('song')}
                                            index={index}
                                            currentList={mainAlbumDetail.songs}
                                            data={item}
                                            showArtists
                                        />
                                    </li>
                                ))}
                        </ul>
                    </div>
                </div>
                <Comments data={data.reviews} songId={id} />
                <div className={cx('created-date')}>
                    <p>4 tháng 8, 2023</p>
                </div>
            </div>
            {isLoading && <Loading isFitMainLayoutContent />}
        </div>
    );
};

export default SongSection;
