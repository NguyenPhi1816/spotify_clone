import classNames from 'classnames/bind';
import styles from './ArtistSection.module.scss';
import { Link, useLocation, useParams } from 'react-router-dom';
import { useState } from 'react';
import { useEffect } from 'react';
import PlayButton from '../PlayButton';
import FavButton from '../FavButton';
import Button from '../Button';
import Song from '../Song';
import Shelf from '../Shelf';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faCertificate,
    faCheck,
    faClock,
} from '@fortawesome/free-solid-svg-icons';
import {
    getAlbumsSongsByUserId,
    getUserById,
} from '../../services/userServices';
import Loading from '../Loading';
import { type, useAppContext } from '../../Context/Context';
import {
    addFavArtist,
    getFavArtist,
    removeFavArtist,
} from '../../services/followerServices';
import ShelfItem from '../ShelfItem';

const cx = classNames.bind(styles);

const ArtistSection = () => {
    const HIDDEN_SONG_NUMBERS = 5;
    const DISPLAYED_SONG_NUMBERS = 10;

    const { id } = useParams();
    const location = useLocation();
    const { state, dispatch } = useAppContext();
    const [data, setData] = useState({});
    const [albums, setAlbums] = useState([]);
    const [numberOfSongs, setNumberOfSongs] = useState(5);
    const [isShowMore, setIsShowMore] = useState(true);
    const [isLoading, setIsLoading] = useState(false);
    const [isPlaying, setIsPlaying] = useState(false);
    const [isFavArtist, setIsFavArtist] = useState(false);

    useEffect(() => {
        setIsLoading(true);
        getUserById(id).then((res) => {
            setData(res.data);
            setIsLoading(false);
        });
    }, [id]);

    useEffect(() => {
        getAlbumsSongsByUserId(id).then((res) => setAlbums(res.data.albums));
    }, [id]);

    useEffect(() => {
        if (!isShowMore) {
            setNumberOfSongs(DISPLAYED_SONG_NUMBERS);
        } else setNumberOfSongs(HIDDEN_SONG_NUMBERS);
    }, [isShowMore]);

    const handleShowMore = () => {
        setIsShowMore((prev) => !prev);
    };

    const handlePlayList = () => {
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

    const hanldeLikeArtist = async () => {
        if (!isFavArtist) {
            await addFavArtist(state.authData.user.id, id);
            setTimeout(() => {
                getFavArtist(state.authData.user.id).then((res) => {
                    dispatch({
                        type: type.SET_FAV_ARTISTS,
                        artists: res.data,
                    });
                    setIsFavArtist(true);
                });
            }, 500);
        } else {
            await removeFavArtist(state.authData.user.id, id);
            setTimeout(() => {
                getFavArtist(state.authData.user.id).then((res) => {
                    dispatch({
                        type: type.SET_FAV_ARTISTS,
                        artists: res.data,
                    });
                    setIsFavArtist(false);
                });
            }, 500);
        }
    };

    useEffect(() => {
        if (state.currentPlayingPath === location.pathname) {
            setIsPlaying(state.isPlaying);
        } else {
            setIsPlaying(false);
        }
    });

    useEffect(() => {
        const artist = state.favArtists.filter((item) => item.id == id);
        setIsFavArtist(artist.length > 0);
    }, [state.favPlaylists]);

    return (
        <div className={cx('container')}>
            <div className={cx('header')}>
                <div
                    className={cx('background')}
                    style={{
                        backgroundImage: `url(${data.photoImagePath})`,
                    }}
                ></div>
                <div className={cx('header-wrapper')}>
                    <div className={cx('info')}>
                        <span className={cx('verified-artist')}>
                            <span className={cx('icon')}>
                                <FontAwesomeIcon
                                    className={cx('icon-background')}
                                    icon={faCertificate}
                                />
                                <FontAwesomeIcon
                                    className={cx('icon-check')}
                                    icon={faCheck}
                                />
                            </span>
                            <p>Nghệ sĩ được xác minh</p>
                        </span>
                        <h1>{data.fullName}</h1>
                        <span className={cx('streaming-count')}>
                            <p>73.082.686 người nghe hằng tháng</p>
                        </span>
                    </div>
                </div>
            </div>
            <div className={cx('body')}>
                <div className={cx('btns')}>
                    <PlayButton
                        isPlaying={isPlaying}
                        onClick={handlePlayList}
                        className={cx('btn')}
                        size="56px"
                    />
                    <FavButton
                        onClick={hanldeLikeArtist}
                        isActive={isFavArtist}
                        className={cx('btn')}
                        size="32px"
                    />
                </div>
                <div className={cx('song-container')}>
                    <h3>Phổ biến</h3>
                    <ul className={cx('song-list')}>
                        {data.songs &&
                            data.songs
                                .slice(0, numberOfSongs)
                                .map((item, index) => (
                                    <li key={item.id}>
                                        <Song
                                            className={cx('song')}
                                            index={index}
                                            currentList={data.songs}
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
                    <Shelf title="Album" to={`/artist/${id}/album`}>
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
                <div className={cx('artist-info-container')}>
                    <h3>Giới thiệu</h3>
                    <div
                        className={cx('artist-info')}
                        style={{
                            backgroundImage: `url(${data.photoImagePath})`,
                        }}
                    >
                        <div className={cx('artist-info-icon')}>
                            <div>
                                <h3>#9</h3>
                                <p>trên thế giới</p>
                            </div>
                        </div>
                        <div className={cx('artist-info-desc')}>
                            <h4>73.082.686 người nghe hàng tháng</h4>
                            <p>
                                Born and raised in L.A., Doja Cat made her first
                                upload to Soundcloud in 2013 at just
                                16-years-old. She developed a knack for music by
                                studying piano and dance as a kid and listening
                                to the likes of Busta Rhymes, Erykah Badu, Nicki
                                Minaj...
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            {isLoading && <Loading isFitMainLayoutContent />}
        </div>
    );
};

export default ArtistSection;
