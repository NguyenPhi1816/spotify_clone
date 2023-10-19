import classNames from 'classnames/bind';
import styles from './AlbumSongModal.module.scss';
import Button from '../Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClock, faXmark } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useState } from 'react';
import { getAlbumsSongsByUserId } from '../../services/userServices';
import DashboardSong from '../Song/DashboardSong';
import ConfirmationDialog from '../../dialog/ConfirmationDialog/ConfirmationDialog';

const cx = classNames.bind(styles);

const AddSongModal = ({ onClose = () => {} }) => {
    const [songs, setSongs] = useState([]);
    const [showAddConfirm, setShowAddConfirm] = useState(false);

    const handleAddSongToAlbum = () => {
        console.log('Song added!');
    };

    useEffect(() => {
        getAlbumsSongsByUserId('18').then((res) => {
            setSongs(res.data.songs);
        });
    }, []);

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
                                            currentList={songs}
                                            data={item}
                                            addButton
                                            setAddConfirm={setShowAddConfirm}
                                            className={cx('dashboard-song')}
                                        />
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
            {showAddConfirm && (
                <ConfirmationDialog
                    message={'Bạn có muốn thêm bài hát này vào album?'}
                    onConfirm={handleAddSongToAlbum}
                    setShow={setShowAddConfirm}
                />
            )}
        </div>
    );
};

export default AddSongModal;
