import classNames from 'classnames/bind';
import styles from './AddArtistToSong.module.scss';
import { useEffect, useState } from 'react';
import Button from '../Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Loading from '../Loading';
import { faPlus, faTrashCan, faXmark } from '@fortawesome/free-solid-svg-icons';
import { createPortal } from 'react-dom';
import useDebounce from '../../hooks/useDebounce';
import { searchArtistByName } from '../../services/userServices';
import ConfirmationDialog from '../../dialog/ConfirmationDialog';
import {
    addUserToSong,
    getSongById,
    removeUserFromSong,
} from '../../services/songServices';

const cx = classNames.bind(styles);

const AddArtistToSong = ({
    songId = null,
    onClose = () => {},
    onChange = () => {},
}) => {
    const [artists, setArtists] = useState([]);
    const [songArtists, setSongArtists] = useState([]);
    const [selectedArtist, setSelectedArtist] = useState(null);
    const [searchValue, setSearchValue] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [isShowAddArtistConfirm, setIsShowAddArtistConfirm] = useState(false);
    const [isShowDeleteArtistConfirm, setIsShowDeleteArtistConfirm] =
        useState(false);

    const debounceValue = useDebounce(searchValue, 500);

    const handleChangeSearchValue = (e) => {
        const value = e.target.value;
        if (!value.startsWith(' ')) setSearchValue(value);
    };

    const handleAddArtistToSong = () => {
        if (selectedArtist !== null && songId !== null)
            addUserToSong(songId, selectedArtist.id).then((res) =>
                setSongArtists(res.data.users),
            );
    };

    const handleDeleteArtistFromSong = () => {
        if (selectedArtist !== null && songId !== null)
            removeUserFromSong(songId, selectedArtist.id).then((res) =>
                setSongArtists(res.data.users),
            );
    };

    useEffect(() => {
        if (debounceValue !== '') {
            setIsLoading(true);
            searchArtistByName(debounceValue).then((res) =>
                setArtists(res.data),
            );
            setIsLoading(false);
        }
    }, [debounceValue]);

    useEffect(() => {
        getSongById(songId).then((res) => setSongArtists(res.data.users));
    }, [songId]);

    useEffect(() => {
        onChange(songArtists);
    }, [songArtists]);

    return createPortal(
        <div className={cx('container')}>
            <div className={cx('wrapper')}>
                <nav className={cx('nav')}>
                    <div>
                        <form className={cx('form')}>
                            <input
                                type="text"
                                value={searchValue}
                                onChange={(e) => handleChangeSearchValue(e)}
                                placeholder="Nhập tên nghệ sĩ"
                            />
                            <input type="submit" value="Tìm kiếm" />
                        </form>
                    </div>
                    <div>
                        <Button
                            className={cx('close-btn')}
                            onClick={onClose}
                            content={<FontAwesomeIcon icon={faXmark} />}
                        />
                    </div>
                </nav>
                <div className={cx('content')}>
                    <div>
                        {artists.length > 0 && (
                            <div className={cx('artist-container')}>
                                <p>Những nghệ sĩ liên quan đến</p>
                                <h3>"{debounceValue}"</h3>
                                <ul className={cx('artist-list')}>
                                    {artists &&
                                        artists.map((artist) => (
                                            <li key={artist.id}>
                                                <div
                                                    className={cx(
                                                        'artist-item-container',
                                                    )}
                                                >
                                                    <div
                                                        className={cx(
                                                            'artist-item',
                                                        )}
                                                    >
                                                        <img
                                                            src={
                                                                artist.photoImagePath
                                                            }
                                                            alt={
                                                                artist.fullName
                                                            }
                                                            className={cx(
                                                                'artist-item-thumb',
                                                            )}
                                                        />
                                                        <span
                                                            className={cx(
                                                                'artist-item-info',
                                                            )}
                                                        >
                                                            <h4
                                                                className={cx(
                                                                    'artist-item-info-header',
                                                                )}
                                                            >
                                                                {
                                                                    artist.fullName
                                                                }
                                                            </h4>
                                                            <p
                                                                className={cx(
                                                                    'artist-item-info-footer',
                                                                )}
                                                            >
                                                                Nghệ sĩ
                                                            </p>
                                                        </span>
                                                    </div>
                                                    <div
                                                        className={cx(
                                                            'artist-item-btns',
                                                        )}
                                                    >
                                                        {songArtists.filter(
                                                            (songArtist) =>
                                                                songArtist.id ===
                                                                artist.id,
                                                        ).length === 0 && (
                                                            <Button
                                                                onClick={() => {
                                                                    setSelectedArtist(
                                                                        artist,
                                                                    );
                                                                    setIsShowAddArtistConfirm(
                                                                        true,
                                                                    );
                                                                }}
                                                                className={cx(
                                                                    'artist-item-btn',
                                                                    'add',
                                                                )}
                                                                noBackground
                                                                content={
                                                                    <FontAwesomeIcon
                                                                        icon={
                                                                            faPlus
                                                                        }
                                                                    />
                                                                }
                                                            />
                                                        )}
                                                        {songArtists.filter(
                                                            (songArtist) =>
                                                                songArtist.id ===
                                                                artist.id,
                                                        ).length > 0 && (
                                                            <Button
                                                                onClick={() => {
                                                                    setSelectedArtist(
                                                                        artist,
                                                                    );
                                                                    setIsShowDeleteArtistConfirm(
                                                                        true,
                                                                    );
                                                                }}
                                                                className={cx(
                                                                    'artist-item-btn',
                                                                    'delete',
                                                                )}
                                                                noBackground
                                                                content={
                                                                    <FontAwesomeIcon
                                                                        icon={
                                                                            faTrashCan
                                                                        }
                                                                    />
                                                                }
                                                            />
                                                        )}
                                                    </div>
                                                </div>
                                            </li>
                                        ))}
                                </ul>
                            </div>
                        )}
                    </div>
                    {isLoading && <Loading />}
                </div>
            </div>
            {isShowAddArtistConfirm && (
                <ConfirmationDialog
                    message={'Bạn có muốn thêm nghệ sĩ này vào bài hát không?'}
                    onConfirm={handleAddArtistToSong}
                    setShow={setIsShowAddArtistConfirm}
                />
            )}

            {isShowDeleteArtistConfirm && (
                <ConfirmationDialog
                    message={'Bạn có muốn xoá nghệ sĩ này khỏi bài hát không?'}
                    onConfirm={handleDeleteArtistFromSong}
                    setShow={setIsShowDeleteArtistConfirm}
                />
            )}
        </div>,
        document.getElementById('root'),
    );
};

export default AddArtistToSong;
