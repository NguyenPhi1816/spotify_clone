import classNames from 'classnames/bind';
import styles from './Playlist.module.scss';
import { useLocation, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import PlayButton from '../PlayButton';
import FavButton from '../FavButton';
import Song from '../Song';
import { faClock, faFolderOpen } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { getPlaylistById } from '../../services/playlistServices';
import Loading from '../Loading';
import {
    addFavoritePlaylist,
    removeFavoritePlaylist,
} from '../../services/userServices';
import { useAuthContext } from '../../context/AuthContext';
import {
    useUserDataContext,
    userDataContextTypes,
} from '../../context/UserDataContext';
import { songContextTypes, useSongContext } from '../../context/SongContext';
import {
    dialogContextTypes,
    useDialogContext,
} from '../../context/DialogContext';
import { MessageType } from '../../dialog/MessageDialog/MessageDialog';

const cx = classNames.bind(styles);

const Playlist = () => {
    const { state: authState } = useAuthContext();
    const { state: userDataState, dispatch: userDataDispatch } =
        useUserDataContext();
    const { state: songState, dispatch: songDispatch } = useSongContext();
    const { dispatch: dialogDispatch } = useDialogContext();

    const { id } = useParams();
    const location = useLocation();
    const [data, setData] = useState({});
    const [isPlaying, setIsPlaying] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [isFavPlaylist, setIsFavPlaylist] = useState(false);

    useEffect(() => {
        setIsLoading(true);
        getPlaylistById(id)
            .then((res) => {
                setData(res.data);
                setIsLoading(false);
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
            });
    }, [id]);

    const totalDuration = () => {
        const MINUTE = 0;
        const SECOND = 1;
        let totalMinutes = 0;
        let totalSeconds = 0;
        data.songs &&
            data.songs.map((item) => {
                const duration = item.duration.split(':');
                totalMinutes += Number(duration[MINUTE]);
                totalSeconds += Number(duration[SECOND]);
            });

        totalMinutes += Math.ceil(totalSeconds / 60);
        return totalMinutes;
    };

    const handlePlayList = () => {
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

    const hanldeLikePlaylist = () => {
        if (!isFavPlaylist) {
            addFavoritePlaylist(authState.authData.user.id, id)
                .then((res) => {
                    console.log(res);
                    userDataDispatch({
                        type: userDataContextTypes.SET_FAV_PLAYLISTS,
                        playlists: res.data,
                    });
                    setIsFavPlaylist(true);
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
                });
        } else {
            removeFavoritePlaylist(authState.authData.user.id, id)
                .then((res) => {
                    console.log(res);
                    userDataDispatch({
                        type: userDataContextTypes.SET_FAV_PLAYLISTS,
                        playlists: res.data,
                    });
                    setIsFavPlaylist(false);
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
                });
        }
    };

    useEffect(() => {
        if (songState.currentPlayingPath === location.pathname) {
            setIsPlaying(songState.isPlaying);
        } else {
            setIsPlaying(false);
        }
    });

    useEffect(() => {
        const playlist = userDataState.favPlaylists.filter(
            (item) => item.id == id,
        );
        setIsFavPlaylist(playlist.length > 0);
    }, [userDataState.favPlaylists]);

    return (
        <div className={cx('container')}>
            <div
                className={cx('header')}
                style={{ backgroundImage: `url(${data.imagePath})` }}
            >
                <p>Playlist</p>
                <h1>{data.name}</h1>
                <p>{data.description}</p>
                <div className={cx('playlist-info')}>
                    <img src={import.meta.env.VITE_LOGO_PRIMARY_URL} />
                    <p>Spotify</p>
                    <span className={cx('dot')}></span>
                    <p>{data.likedCount} lượt thích</p>
                    <span className={cx('dot')}></span>
                    <p>{data.sumSongCount} bài hát,</p>
                    <p className={cx('duration')}>
                        khoảng {totalDuration()} phút
                    </p>
                </div>
            </div>
            {data.songs &&
                (data.songs.length > 0 ? (
                    <div className={cx('body')}>
                        <div className={cx('btns')}>
                            <PlayButton
                                isPlaying={isPlaying}
                                onClick={handlePlayList}
                                className={cx('btn')}
                                size="56px"
                            />
                            <FavButton
                                onClick={hanldeLikePlaylist}
                                isActive={isFavPlaylist}
                                className={cx('btn')}
                                size="32px"
                            />
                        </div>
                        <ul>
                            <li className={cx('list-header')}>
                                <div className={cx('list-header-content')}>
                                    <p className={cx('index')}>#</p>
                                    <p className={cx('first')}>Tiêu đề</p>
                                    <p className={cx('album')}>Album</p>
                                    <p className={cx('created-at')}>
                                        Ngày thêm
                                    </p>
                                    <div className={cx('last')}>
                                        <span> </span>
                                        <FontAwesomeIcon icon={faClock} />
                                        <span> </span>
                                    </div>
                                </div>
                            </li>
                            {data.songs.map((item, index) => (
                                <li key={item.id}>
                                    <Song
                                        index={index}
                                        currentList={data.songs}
                                        data={item}
                                        showArtists
                                        showAlbums
                                        showCreatedDate
                                    />
                                </li>
                            ))}
                        </ul>
                    </div>
                ) : (
                    <div className={cx('placeholder', 'flex-1')}>
                        <FontAwesomeIcon
                            icon={faFolderOpen}
                            className={cx('placeholder-icon')}
                        />
                        <h4>Danh sách này chưa có bài hát nào</h4>
                    </div>
                ))}
            {isLoading && <Loading isFitMainLayoutContent />}
        </div>
    );
};

export default Playlist;
