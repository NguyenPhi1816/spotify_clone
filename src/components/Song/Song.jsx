import classNames from 'classnames/bind';
import styles from './Song.module.scss';
import FavButton from '../FavButton';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsis, faPause, faPlay } from '@fortawesome/free-solid-svg-icons';
import { Link, useLocation } from 'react-router-dom';
import { Fragment, useEffect, useRef, useState } from 'react';
import { type, useAppContext } from '../../Context/Context';
import PlayButton from '../PlayButton';
import {
    addSongToFavPlaylist,
    removeSongFromFavPlaylist,
} from '../../services/playlistServices';

const cx = classNames.bind(styles);

const Song = ({
    className,
    index,
    data,
    showStreamCount = false,
    showArtists = false,
    showAlbums = false,
    showCreatedDate = false,
    currentList = [],
}) => {
    const { state, dispatch } = useAppContext();

    const location = useLocation();
    const [isCurrentSong, setIsCurrentSong] = useState(true);
    const [isPlaying, setIsPlaying] = useState(true);
    const [isFavSong, setIsFavSong] = useState(false);

    const calculateCreatedDate = (createdDateStr) => {
        const [datePart, timePart] = createdDateStr.split(' ');
        const [day, month, year] = datePart.split('/');
        const newDate = month + '/' + day + '/' + year + ' ' + timePart;

        const createdDate = new Date(newDate);
        const currentDate = new Date();
        const diff = currentDate - createdDate;
        const daysDiff = Math.floor(diff / (1000 * 60 * 60 * 24));

        let output = '';

        if (daysDiff < 30) {
            output = daysDiff + ' ngày trước';
        } else if (daysDiff < 365) {
            let months = Math.floor(daysDiff / 30);
            output = months + ' tháng trước';
        } else {
            let years = Math.floor(daysDiff / 365);
            output = years + ' năm trước';
        }

        return output;
    };

    const songMatched = () =>
        state.currentPlayingSongId !== null &&
        data.id === state.currentPlayingSongId;

    useEffect(() => {
        setIsCurrentSong(() => songMatched());
    }, [state.currentPlayingSongId]);

    useEffect(() => {
        setIsPlaying(state.isPlaying);
    }, [state.isPlaying]);

    const handlePlayList = () => {
        if (!isCurrentSong) {
            console.log('load');
            dispatch({
                type: type.LOAD_SONG,
                currentPlayingPath: location.pathname,
                currentPlayingList: currentList,
                currentPlayingSongIndex: index,
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
        if (isCurrentSong) {
            setIsPlaying(state.isPlaying);
        } else {
            setIsPlaying(false);
        }
    });

    useEffect(() => {
        if (
            state.likedSongsPlaylist !== null &&
            Object.keys(state.likedSongsPlaylist).length > 0
        ) {
            const [song] = state.likedSongsPlaylist.songs.filter(
                (item) => item.id === data.id,
            );
            if (!!song) {
                setIsFavSong(true);
            }
        }
    }, [state.likedSongsPlaylist]);

    const handleLikeSong = () => {
        if (!isFavSong) {
            addSongToFavPlaylist(state.authData.user.id, data.id).then(
                (res) => {
                    dispatch({
                        type: type.SET_LIKED_SONGS_PLAYLIST,
                        playlist: res.data,
                    });
                    setIsFavSong(true);
                },
            );
        } else {
            removeSongFromFavPlaylist(state.authData.user.id, data.id).then(
                (res) => {
                    if (res.status == 200 && state.likedSongsPlaylist.songs) {
                        const new_songs = state.likedSongsPlaylist.songs.filter(
                            (item) => item.id !== data.id,
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

    return (
        <div className={cx('container', className)}>
            <div className={cx('wrapper')}>
                <div className={cx('col1')}>
                    <span className={cx('index')}>
                        {isPlaying && isCurrentSong && (
                            <img
                                src="https://open.spotifycdn.com/cdn/images/equaliser-animated-green.f5eb96f2.gif"
                                alt="playing icon"
                            />
                        )}
                        {(!isPlaying || !isCurrentSong) && (
                            <p
                                style={{
                                    color:
                                        isCurrentSong &&
                                        'var(--background-green-base)',
                                }}
                            >
                                {index + 1}
                            </p>
                        )}
                    </span>
                    <span className={cx('icon-play')}>
                        <PlayButton
                            isPlaying={isPlaying}
                            onClick={(e) => handlePlayList(e)}
                            noBackground
                            className={cx('btn')}
                        />
                    </span>
                </div>
                <div className={cx('first', 'col2')}>
                    <img
                        className={cx('thumb')}
                        src={data.imagePath}
                        alt={data.name}
                    />
                    <div className={cx('var1')}>
                        <Link
                            to={`/track/${data.id}`}
                            className={cx('name')}
                            style={{
                                color:
                                    isCurrentSong &&
                                    'var(--background-green-base)',
                            }}
                        >
                            {data.name}
                        </Link>
                        {showArtists && (
                            <div className={cx('artists')}>
                                {data.users &&
                                    data.users.map((artist, index) => (
                                        <Fragment key={artist.id}>
                                            <Link to={`/artist/${artist.id}`}>
                                                {artist.firstName +
                                                    ' ' +
                                                    artist.lastName}
                                            </Link>
                                            {index < data.users.length - 1 && (
                                                <p>, </p>
                                            )}
                                        </Fragment>
                                    ))}
                            </div>
                        )}
                    </div>
                </div>

                {showAlbums && (
                    <div className={cx('album-container', 'col3')}>
                        {data.albums &&
                            data.albums.map((album, index) => (
                                <Fragment key={album.id}>
                                    <Link
                                        to={`/album/${album.id}`}
                                        className={cx('album')}
                                    >
                                        {album.name}
                                    </Link>
                                    {index < data.albums.length - 1 && <p>,</p>}
                                </Fragment>
                            ))}
                    </div>
                )}

                {showStreamCount && (
                    <div className={cx('stream-count', 'col4')}>
                        <p>{data.viewCount}</p>
                    </div>
                )}

                {showCreatedDate && (
                    <p className={cx('created-at', 'col4')}>
                        {calculateCreatedDate(data.releaseDate)}
                    </p>
                )}

                <div className={cx('last', 'col5')}>
                    <FavButton
                        isActive={isFavSong}
                        onClick={handleLikeSong}
                        className={cx('fav-btn')}
                    />
                    <p className={cx('duration')}>{data.duration}</p>
                    <button className={cx('ellipsis')}>
                        <FontAwesomeIcon icon={faEllipsis} />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Song;
