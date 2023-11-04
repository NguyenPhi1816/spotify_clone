import classNames from 'classnames/bind';
import styles from './MusicManagement.module.scss';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getUserById } from '../../services/userServices';
import Button from '../Button';
import DashboardSong from '../Song/DashboardSong';
import ConfirmationDialog from '../../dialog/ConfirmationDialog/ConfirmationDialog';
import AddSongModal from '../AddSongModal/AddSongModal';
import Loading from '../Loading';
import {
    createSong,
    uploadSongAudio,
    uploadSongImage,
} from '../../services/songServices';

const cx = classNames.bind(styles);

const MusicManagement = () => {
    const { id } = useParams();
    const [data, setData] = useState({});
    const [showDeleteSongConfirm, setShowDeleteSongConfirm] = useState(false);
    const [showAddSongModal, setShowAddSongModal] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const handleDeleteSong = () => {
        console.log('Song deleted!');
    };

    const handleAddSong = async (songData, selectedAudio, selectedImage) => {
        let newSong = await createSong(
            songData.name,
            songData.genre,
            songData.duration,
            songData.lyric,
            songData.day,
            songData.month,
            songData.year,
            songData.label,
            songData.usersId,
        ).then((res) => res.data);

        newSong = await uploadSongImage(newSong.id, selectedImage).then(
            (res) => res.data,
        );

        newSong = await uploadSongAudio(newSong.id, selectedAudio).then(
            (res) => res.data,
        );

        const newData = { ...data, songs: [...data.songs, newSong] };
        setData(newData);

        setShowAddSongModal(false);
    };

    const handleShowAddSongModal = () => {
        setShowAddSongModal((prev) => !prev);
    };

    useEffect(() => {
        setIsLoading(true);
        getUserById(id).then((res) => {
            setData(res.data);
            setIsLoading(false);
        });
    }, [id]);

    return (
        <div className={cx('container')}>
            <div className={cx('body')}>
                <div className={cx('song-container')}>
                    <div className={cx('header')}>
                        <h2>Danh sách bài hát</h2>
                        <Button
                            onClick={handleShowAddSongModal}
                            content="Thêm bài hát"
                        />
                    </div>
                    <ul className={cx('song-list')}>
                        {data.songs &&
                            data.songs.map((item, index) => (
                                <li key={item.id}>
                                    <DashboardSong
                                        className={cx('song')}
                                        index={index}
                                        data={item}
                                        toggleButton
                                        setDeleteConfirm={
                                            setShowDeleteSongConfirm
                                        }
                                    />
                                </li>
                            ))}
                    </ul>
                </div>
            </div>
            {showDeleteSongConfirm && (
                <ConfirmationDialog
                    message={`Bạn chắc chắn muốn xóa bài hát này?`}
                    setShow={setShowDeleteSongConfirm}
                    onConfirm={handleDeleteSong}
                />
            )}
            {showAddSongModal && (
                <AddSongModal
                    onClose={handleShowAddSongModal}
                    onSubmit={handleAddSong}
                />
            )}
            {isLoading && <Loading />}
        </div>
    );
};

export default MusicManagement;
