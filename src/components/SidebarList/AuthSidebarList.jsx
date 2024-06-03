import classNames from 'classnames/bind';
import styles from './SidebarList.module.scss';

import Button from '../Button';
import SidebarListItem from '../SidebarListItem';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useState } from 'react';
import { getPlaylistById } from '../../services/playlistServices';
import SidebarListItemSkeleton from '../SidebarListItem/SidebarListItemSkeleton';
import {
    useUserDataContext,
    userDataContextTypes,
} from '../../context/UserDataContext';

const cx = classNames.bind(styles);

const AuthSidebarList = () => {
    const PLAYLIST = 'playlist';
    const ARTIST = 'artist';

    const { state: userDataState, dispatch: userDataDispatch } =
        useUserDataContext();

    const [data, setData] = useState({});
    const [activeBtn, setActiveBtn] = useState(null);
    const [searchValue, setSearchValue] = useState('');
    const [likedSongsPlaylist, setLikedSongsPlaylist] = useState({});

    useEffect(() => {
        setData((prev) => ({
            followings: prev.followings,
            playlists: userDataState.favPlaylists,
        }));
    }, [userDataState.favPlaylists]);

    useEffect(() => {
        setData((prev) => ({
            followings: userDataState.favArtists,
            playlists: prev.playlists,
        }));
    }, [userDataState.favArtists]);

    useEffect(() => {
        if (Object.keys(likedSongsPlaylist).length > 0)
            getPlaylistById(likedSongsPlaylist.id).then((res) => {
                userDataDispatch({
                    type: userDataContextTypes.SET_LIKED_SONGS_PLAYLIST,
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
                {userDataState.isLoading ? (
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
