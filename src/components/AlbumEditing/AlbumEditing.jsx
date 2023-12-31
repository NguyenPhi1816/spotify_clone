import classNames from 'classnames/bind';
import styles from './AlbumEditing.module.scss';
import { Link, useParams } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClock } from '@fortawesome/free-solid-svg-icons';
import Button from '../Button';
import {
    changeAlbumName,
    getAlbumById,
    removeSongFromAlbum,
    uploadAlbumImage,
} from '../../services/albumServices';
import ConfirmationDialog from '../../dialog/ConfirmationDialog';
import DashboardSong from '../Song/DashboardSong';
import AlbumSongModal from '../AlbumSongModal';
import HeadlessTippy from '../HeadlessTippy';
import ImageUploadModal from '../ImageUploadModal';
import Loading from '../Loading';

const cx = classNames.bind(styles);

const AlbumEditing = () => {
    const { id } = useParams();
    const albumNameRef = useRef();
    const [data, setData] = useState({});
    const [title, setTitle] = useState('');
    const [showTitleChangeConfirm, setShowTitleChangeConfirm] = useState(false);
    const [showDeleteSongConfirm, setShowDeleteSongConfirm] = useState(false);
    const [showAddSongModal, setShowAddSongModal] = useState(false);
    const [showTippy, setShowTippy] = useState(false);
    const [showUploadImageModal, setShowUploadImageModal] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [selectedSongId, setSelectedSongId] = useState(null);

    const handleChangeTitle = () => {
        if (title.trim() !== '')
            changeAlbumName(id, title).then((res) => setData(res.data));
    };

    const handleShowDeleteConfirm = (songId) => {
        setSelectedSongId(songId);
        setShowDeleteSongConfirm(true);
    };

    const handleDeleteSong = () => {
        if (selectedSongId !== null) {
            removeSongFromAlbum(id, selectedSongId).then((res) => {
                setData(res.data);
            });
        }
    };

    const handleChangeAlbumSongs = (albumSongs) => {
        setData((prev) => ({ ...prev, songs: albumSongs }));
    };

    const handleToggleAddSongModal = () => setShowAddSongModal((prev) => !prev);

    const handleShowTippy = () => setShowTippy((prev) => !prev);

    const handleShowUploadImageModal = () => {
        setShowTippy(false);
        setShowUploadImageModal((prev) => !prev);
    };

    const handleChangeImage = async (file) => {
        await uploadAlbumImage(id, file).then((res) => setData(res.data));

        setShowUploadImageModal(false);
    };

    useEffect(() => {
        setIsLoading(true);
        getAlbumById(id).then((res) => {
            setData(res.data);
            setIsLoading(false);
        });
    }, [id]);

    useEffect(() => {
        const handleEditTitle = () => {
            albumNameRef.current.contentEditable = true;
            albumNameRef.current.focus();
        };

        const handleBlurTitle = () => {
            albumNameRef.current.contentEditable = false;
            const new_title = albumNameRef.current.innerText;
            if (
                new_title.trim() !== '' &&
                new_title.trim() !== data.name.trim()
            ) {
                setTitle(albumNameRef.current.innerText);
                setShowTitleChangeConfirm(true);
            } else {
                albumNameRef.current.innerText = data.name;
            }
        };

        albumNameRef.current.addEventListener('click', handleEditTitle);
        albumNameRef.current.addEventListener('blur', handleBlurTitle);

        return () => {
            if (albumNameRef.current) {
                albumNameRef.current.removeEventListener(
                    'click',
                    handleEditTitle,
                );
                albumNameRef.current.removeEventListener(
                    'blur',
                    handleBlurTitle,
                );
            }
        };
    }, [albumNameRef.current, data]);

    return (
        <div className={cx('container')}>
            <div className={cx('header')}>
                <div
                    className={cx('background')}
                    style={{
                        backgroundImage: `url(${data.imagePath})`,
                    }}
                ></div>
                <div className={cx('header-wrapper')}>
                    <HeadlessTippy
                        items={
                            <div className={cx('tippy')}>
                                <Button
                                    className={cx('tippy-btn')}
                                    noBackground
                                    content={<p>Thay đổi hình ảnh</p>}
                                    onClick={handleShowUploadImageModal}
                                />
                            </div>
                        }
                        show={showTippy}
                        setShow={setShowTippy}
                    >
                        <span onClick={handleShowTippy}>
                            <img
                                className={cx('image')}
                                src={data.imagePath}
                                alt={data.name}
                            />
                        </span>
                    </HeadlessTippy>
                    <div className={cx('info')}>
                        <p>
                            {data.songs && data.songs.length === 1
                                ? 'Đĩa đơn'
                                : 'Album'}
                        </p>
                        <div className={cx('title-container')}>
                            <h1 className={cx('title')} ref={albumNameRef}>
                                {data.name}
                            </h1>
                        </div>
                        <span>
                            <img
                                src={data.user && data.user.photoImagePath}
                                alt={data.user && data.user.fullName}
                            />
                            <Link
                                to={`/artist/${data.user && data.user.id}`}
                                className={cx('artist', 'link')}
                            >
                                {data.user && data.user.fullName}
                            </Link>
                            <span className={cx('dot')}></span>
                            <p>
                                {data.releaseDate &&
                                    data.releaseDate.substring(6, 11)}
                            </p>
                            <span className={cx('dot')}></span>
                            <p>{data.songs && data.songs.length} bài hát</p>
                            <span className={cx('dot')}></span>
                            <p>{data.totalTime}</p>
                        </span>
                    </div>
                </div>
            </div>
            <div className={cx('body')}>
                <div
                    className={cx('background')}
                    style={{
                        backgroundImage: `url(${data.imagePath})`,
                    }}
                ></div>
                <div className={cx('song-container')}>
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
                        {data.songs &&
                            data.songs.map((item, index) => (
                                <li key={item.id}>
                                    <DashboardSong
                                        index={index}
                                        data={item}
                                        deleteButton
                                        onRemoveSong={handleShowDeleteConfirm}
                                    />
                                </li>
                            ))}
                    </ul>
                </div>
                <div className={cx('btns')}>
                    <Button
                        onClick={handleToggleAddSongModal}
                        className={cx('btn')}
                        content={'Thêm bài hát'}
                    />
                </div>
            </div>
            {showTitleChangeConfirm && (
                <ConfirmationDialog
                    message={`Thay đổi tên album thành "${title}" ?`}
                    setShow={setShowTitleChangeConfirm}
                    onConfirm={handleChangeTitle}
                />
            )}
            {showDeleteSongConfirm && (
                <ConfirmationDialog
                    message={`Bạn chắc chắn muốn xóa bài hát này?`}
                    setShow={setShowDeleteSongConfirm}
                    onConfirm={handleDeleteSong}
                />
            )}
            {showAddSongModal && (
                <AlbumSongModal
                    userId={data.user.id}
                    albumId={id}
                    onChange={handleChangeAlbumSongs}
                    onClose={handleToggleAddSongModal}
                />
            )}
            {showUploadImageModal && (
                <ImageUploadModal
                    handleUploadFile={handleChangeImage}
                    onClose={handleShowUploadImageModal}
                />
            )}
            {isLoading && <Loading />}
        </div>
    );
};

export default AlbumEditing;
