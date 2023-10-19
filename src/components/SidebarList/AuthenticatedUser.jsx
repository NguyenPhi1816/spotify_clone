import classNames from 'classnames/bind';
import styles from './SidebarList.module.scss';

import Button from '../Button';
import SidebarListItem from '../SidebarListItem';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useState } from 'react';
import { useAppContext } from '../../Context/Context';
import { getFollowingPlaylist } from '../../services/userServices';

const cx = classNames.bind(styles);

const AuthenticatedUser = () => {
    const PLAYLIST = 'playlist';
    const ARTIST = 'artist';

    const { state } = useAppContext();
    const [data, setData] = useState({});

    useEffect(() => {
        getFollowingPlaylist(state.authData.user.id).then((res) =>
            setData(res.data),
        );
    }, [state.authData.user.id]);

    const [activeBtn, setActiveBtn] = useState(null);
    const [searchValue, setSearchValue] = useState('');

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
        <div>
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
                {data.playlists &&
                    (activeBtn === PLAYLIST || activeBtn === null) &&
                    data.playlists.map((item) => {
                        return (
                            item.name.toLowerCase().indexOf(searchValue) !==
                                -1 && (
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
                            item.fullName.toLowerCase().indexOf(searchValue) !==
                                -1 && (
                                <li key={item.id}>
                                    <SidebarListItem
                                        type="artist"
                                        data={item}
                                    />
                                </li>
                            )
                        );
                    })}
            </ul>
        </div>
    );
};

export default AuthenticatedUser;
