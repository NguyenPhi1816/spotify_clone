import classNames from 'classnames/bind';
import styles from './SidebarList.module.scss';

import Button from '../Button';
import SidebarListItem from '../SidebarListItem';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useState } from 'react';
import { type, useAppContext } from '../../context/Context';
import { getFollowingPlaylist } from '../../services/userServices';
import Loading from '../Loading';
import { getPlaylistById } from '../../services/playlistServices';
import SidebarListItemSkeleton from '../SidebarListItem/SidebarListItemSkeleton';
import { MessageType } from '../../dialog/MessageDialog/MessageDialog';

const cx = classNames.bind(styles);

const AuthSidebarList = () => {
    const PLAYLIST = 'playlist';
    const ARTIST = 'artist';
    const LIKED_SONGS_PLAYLIST_NAME = 'Liked Songs';

    const { state, dispatch } = useAppContext();
    const [data, setData] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const [activeBtn, setActiveBtn] = useState(null);
    const [searchValue, setSearchValue] = useState('');
    const [likedSongsPlaylist, setLikedSongsPlaylist] = useState({});

    useEffect(() => {
        setIsLoading(true);
        getFollowingPlaylist(state.authData.user.id)
            .then((res) => {
                setData(res.data);

                dispatch({
                    type: type.SET_FAV_PLAYLISTS,
                    playlists: res.data.playlists,
                });
                dispatch({
                    type: type.SET_FAV_ARTISTS,
                    artists: res.data.followings,
                });

                const [_likedSongPlaylist] = res.data.playlists.filter(
                    (item) => item.name === LIKED_SONGS_PLAYLIST_NAME,
                );

                if (_likedSongPlaylist)
                    setLikedSongsPlaylist(_likedSongPlaylist);
            })
            .catch((error) => {
                dispatch({
                    type: type.SHOW_MESSAGE_DIALOG,
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
    }, [state.authData.user.id]);

    useEffect(() => {
        setData((prev) => ({
            followings: prev.followings,
            playlists: state.favPlaylists,
        }));
    }, [state.favPlaylists]);

    useEffect(() => {
        setData((prev) => ({
            followings: state.favArtists,
            playlists: prev.playlists,
        }));
    }, [state.favArtists]);

    useEffect(() => {
        if (Object.keys(likedSongsPlaylist).length > 0)
            getPlaylistById(likedSongsPlaylist.id).then((res) => {
                dispatch({
                    type: type.SET_LIKED_SONGS_PLAYLIST,
                    playlist: res.data,
                });
            });
    }, [likedSongsPlaylist]);

    const handleClick = (target, type) => {
        if (target.classList.contains(cx('active'))) {
            setActiveBtn(null);
            return;
        }
        setActiveBtn(type);
    };

    const handleSearch = (event) => {
        setSearchValue(event.target.value.toLowerCase());
    };

    return (
        <div className={cx('container')}>
            <div className={cx('btns')}>
                <Button
                    content="Danh sách phát"
                    className={cx('btn', { active: activeBtn === PLAYLIST })}
                    customFontSize="14px"
                    onClick={(e) => handleClick(e.target, PLAYLIST)}
                />
                <Button
                    content="Nghệ sĩ"
                    className={cx('btn', { active: activeBtn === ARTIST })}
                    customFontSize="14px"
                    onClick={(e) => handleClick(e.target, ARTIST)}
                />
            </div>
            <div className={cx('search')}>
                <input
                    placeholder="Tìm kiếm trong thư viện"
                    className={cx('input')}
                    onInput={(e) => handleSearch(e)}
                />
                <FontAwesomeIcon icon={faMagnifyingGlass} />
            </div>
            <ul>
                {isLoading ? (
                    new Array(5)
                        .fill(0)
                        .map((item, index) => (
                            <SidebarListItemSkeleton key={index} />
                        ))
                ) : (
                    <>
                        {data.playlists &&
                            (activeBtn === PLAYLIST || activeBtn === null) &&
                            data.playlists.map((item) => {
                                return (
                                    item.name
                                        .toLowerCase()
                                        .indexOf(searchValue) !== -1 && (
                                        <li key={item.id}>
                                            <SidebarListItem
                                                type="playlist"
                                                data={item}
                                            />
                                        </li>
                                    )
                                );
                            })}
                        {data.followings &&
                            (activeBtn === ARTIST || activeBtn === null) &&
                            data.followings.map((item) => {
                                return (
                                    item.fullName
                                        .toLowerCase()
                                        .indexOf(searchValue) !== -1 && (
                                        <li key={item.id}>
                                            <SidebarListItem
                                                type="artist"
                                                data={item}
                                            />
                                        </li>
                                    )
                                );
                            })}
                    </>
                )}
            </ul>
        </div>
    );
};

export default AuthSidebarList;
