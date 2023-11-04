import classNames from 'classnames/bind';
import styles from './AlbumSongModal.module.scss';
import Button from '../Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClock, faXmark } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useState } from 'react';
import { getAlbumsSongsByUserId } from '../../services/userServices';
import DashboardSong from '../Song/DashboardSong';
import ConfirmationDialog from '../../dialog/ConfirmationDialog';
import Loading from '../Loading';
import {
    addSongToAlbum,
    getAlbumById,
    removeSongFromAlbum,
} from '../../services/albumServices';

const cx = classNames.bind(styles);

const AlbumSongModal = ({
    userId = null,
    albumId = null,
    onClose = () => {},
    onChange = () => {},
}) => {
    const [songs, setSongs] = useState([]);
    const [showAddConfirm, setShowAddConfirm] = useState(false);
    const [showRemoveConfirm, setShowRemoveConfirm] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [selectedSongId, setSelectedSongId] = useState(null);
    const [albumSongs, setAlbumSongs] = useState([]);

    const handleAddSong = (songId) => {
        setSelectedSongId(songId);
        setShowAddConfirm(true);
    };

    const handleRemoveSong = (songId) => {
        setSelectedSongId(songId);
        setShowRemoveConfirm(true);
    };

    const handleAddSongToAlbum = () => {
        if (albumId !== null && selectedSongId !== null)
            addSongToAlbum(albumId, selectedSongId).then((res) => {
                setAlbumSongs(res.data.songs);
            });
    };

    const handleRemoveSongFromAlbum = () => {
        if (albumId !== null && selectedSongId !== null)
            removeSongFromAlbum(albumId, selectedSongId).then((res) => {
                setAlbumSongs(res.data.songs);
            });
    };

    useEffect(() => {
        if (userId !== null) {
            setIsLoading(true);
            getAlbumsSongsByUserId(userId).then((res) => {
                setSongs(res.data.songs);
                setIsLoading(false);
            });
        }
    }, [userId]);

    useEffect(() => {
        if (albumId !== null) {
            getAlbumById(albumId).then((res) => setAlbumSongs(res.data.songs));
        }
    }, [albumId]);

    useEffect(() => {
        onChange(albumSongs);
    }, [albumSongs]);

    return (
        <div className={cx('container')}>
            <div className={cx('wrapper')}>
                <nav className={cx('nav')}>
                    <div>
                        <form className={cx('form')}>
                            <input
                                type="text"
                                placeholder="Nhập tên bài hát..."
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
                        <div className={cx('song-container')}>
                            <h3>Danh sách nhạc của bạn</h3>
                            <ul className={cx('song-list')}>
                                <li className={cx('list-header')}>
                                    <div className={cx('list-header-content')}>
                                        <p className={cx('index')}>#</p>
                                        <p className={cx('first')}>Tiêu đề</p>
                                        <p>Lượt nghe</p>
                                        <p>Ngày tạo</p>
                                        <div className={cx('last')}>
                                            <FontAwesomeIcon icon={faClock} />
                                            <span> </span>
                                            <span> </span>
                                        </div>
                                    </div>
                                </li>
                                {songs.map((item, index) => (
                                    <li key={item.id}>
                                        <DashboardSong
                                            index={index}
                                            data={item}
                                            addButton={
                                                albumSongs.filter(
                                                    (song) =>
                                                        song.id === item.id,
                                                ).length === 0
                                            }
                                            deleteButton={
                                                albumSongs.filter(
                                                    (song) =>
                                                        song.id === item.id,
                                                ).length > 0
                                            }
                                            onAddSong={handleAddSong}
                                            onRemoveSong={handleRemoveSong}
                                            className={cx('dashboard-song')}
                                        />
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    {isLoading && <Loading />}
                </div>
            </div>
            {showAddConfirm && (
                <ConfirmationDialog
                    message={'Bạn có muốn thêm bài hát này vào album?'}
                    onConfirm={handleAddSongToAlbum}
                    setShow={setShowAddConfirm}
                />
            )}
            {showRemoveConfirm && (
                <ConfirmationDialog
                    message={'Bạn có muốn xóa bài hát này khỏi album?'}
                    onConfirm={handleRemoveSongFromAlbum}
                    setShow={setShowRemoveConfirm}
                />
            )}
        </div>
    );
};

export default AlbumSongModal;
