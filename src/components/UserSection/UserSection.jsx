import classNames from 'classnames/bind';
import styles from './UserSection.module.scss';
import { Link } from 'react-router-dom';
import { useLayoutEffect, useState } from 'react';
import { useEffect } from 'react';
import Button from '../Button';
import Song from '../Song';
import { useRef } from 'react';
import { getAlbumsSongsByUserId } from '../../services/userServices';
import { getFollowingsByUserId } from '../../services/followingServices';
import Loading from '../Loading';
import ArtistCard from '../ArtistCard/ArtistCard';
import { useAuthContext } from '../../context/AuthContext';
import {
    dialogContextTypes,
    useDialogContext,
} from '../../context/DialogContext';
import { MessageType } from '../../dialog/MessageDialog/MessageDialog';

const cx = classNames.bind(styles);

const UserSection = () => {
    const HIDDEN_SONG_NUMBERS = 5;
    const DISPLAYED_SONG_NUMBERS = 10;

    const { dispatch: dialogDispatch } = useDialogContext();
    const { state: authState } = useAuthContext();

    const ref = useRef();
    const [user, setUser] = useState({});
    const [songs, setSongs] = useState([]);
    const [following, setFollowing] = useState([]);
    const [numberOfSongs, setNumberOfSongs] = useState(5);
    const [isShowMore, setIsShowMore] = useState(true);
    const [containerWidth, setContainerWidth] = useState(0);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        setIsLoading(true);
        if (user.id) {
            getAlbumsSongsByUserId(user.id)
                .then((res) => {
                    setSongs(res.data.songs);
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
        }
    }, [user]);

    useEffect(() => {
        if (user.id) {
            getFollowingsByUserId(user.id)
                .then((res) => setFollowing(res.data))
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
    }, [user]);

    useEffect(() => {
        if (!isShowMore) {
            setNumberOfSongs(DISPLAYED_SONG_NUMBERS);
        } else setNumberOfSongs(HIDDEN_SONG_NUMBERS);
    }, [isShowMore]);

    const handleShowMore = () => {
        setIsShowMore((prev) => !prev);
    };

    useEffect(() => {
        if (authState.authData) setUser(authState.authData.user);
    }, [authState.authData]);

    useLayoutEffect(() => {
        setContainerWidth(ref.current.offsetWidth);
    }, []);

    return (
        <div className={cx('container')} ref={ref}>
            <div className={cx('header')}>
                <div
                    className={cx('background')}
                    style={{
                        backgroundImage: `url(${user.photoImagePath})`,
                    }}
                ></div>
                <div className={cx('header-wrapper')}>
                    <img
                        className={cx('image')}
                        src={user.photoImagePath}
                        alt={user.fullName}
                    />
                    <div className={cx('info')}>
                        <p>Hồ sơ</p>
                        <h1>{user.fullName}</h1>
                        <span>
                            <p>2 đang theo dõi</p>
                        </span>
                    </div>
                </div>
            </div>
            <div className={cx('body')}>
                <div
                    className={cx('background')}
                    style={{
                        backgroundImage: `url(${user.photoImagePath})`,
                    }}
                ></div>
                {songs.length > 0 && (
                    <div className={cx('song-container')}>
                        <h3>Bản nhạc hàng đầu tháng này</h3>
                        <p>Chỉ hiện thị với bạn</p>
                        <ul className={cx('song-list')}>
                            {songs
                                .slice(0, numberOfSongs)
                                .map((item, index) => (
                                    <li key={item.id}>
                                        <Song
                                            index={index}
                                            currentList={songs}
                                            data={item}
                                            showArtists
                                            showAlbums
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
                {following.length > 0 && (
                    <div className={cx('following')}>
                        <h2>Đang theo dõi</h2>
                        <ul
                            className={cx('following-container')}
                            style={{
                                gridTemplateColumns: `repeat(${Math.floor(
                                    containerWidth / 200,
                                )}, 1fr)`,
                            }}
                        >
                            {following.map((item) => (
                                <li key={item.id}>
                                    <ArtistCard data={item} />
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>
            {isLoading && <Loading isFitDashboardLayoutContent />}
        </div>
    );
};

export default UserSection;
