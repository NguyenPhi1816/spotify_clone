import classNames from 'classnames/bind';
import styles from './AlbumManagement.module.scss';
import { useParams } from 'react-router-dom';
import ShelfItem from '../ShelfItem';
import { useEffect, useState } from 'react';
import { getAlbumsSongsByUserId } from '../../services/userServices';
import Button from '../Button';
import AlbumSongModal from '../AlbumSongModal';
import AddAlbumModal from '../AddAlbumModal';
import Loading from '../Loading';
import { createAlbum } from '../../services/albumServices';
import { useAuthContext } from '../../context/AuthContext';
import {
    dialogContextTypes,
    useDialogContext,
} from '../../context/DialogContext';
import { MessageType } from '../../dialog/MessageDialog/MessageDialog';

const cx = classNames.bind(styles);

const AlbumManagement = () => {
    const { dispatch: dialogDispatch } = useDialogContext();

    const { id } = useParams();
    const { state: authState } = useAuthContext();
    const [data, setData] = useState([]);
    const [showAddAlbumModal, setShowAddAlbumModal] = useState(false);
    const [showAddSongModal, setShowAddSongModal] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [newAlbumId, setNewAlbumId] = useState(null);

    const handleShowAddAlbumModal = () => {
        setShowAddAlbumModal((prev) => !prev);
    };

    const handleSaveAlbum = async (value) => {
        const accessToken = authState.authData['access_token'];
        if (accessToken) {
            await createAlbum(accessToken, value)
                .then((res) => {
                    const album = res.data;
                    data.push(album);
                    setNewAlbumId(album.id);
                    setShowAddAlbumModal(false);
                    setShowAddSongModal(true);
                })
                .catch((error) =>
                    dialogDispatch({
                        type: dialogContextTypes.SHOW_MESSAGE_DIALOG,
                        message: {
                            title: 'Có lỗi xảy ra',
                            message: error.message,
                            type: MessageType.ERROR,
                        },
                    }),
                );
        }
    };

    useEffect(() => {
        setIsLoading(true);
        getAlbumsSongsByUserId(id)
            .then((res) => {
                setData(res.data.albums);
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
            })
            .finally(() => {
                setIsLoading(false);
            });
    }, [id]);

    console.log(data);

    return (
        <section className={cx('container')}>
            <div className={cx('title')}>
                <h2>Danh sách album</h2>
                <Button
                    onClick={handleShowAddAlbumModal}
                    content="Thêm album"
                />
            </div>
            <div>
                <ul className={cx('list')}>
                    {data &&
                        data.map((item) => (
                            <li key={item.id}>
                                <ShelfItem
                                    shelfItemData={item}
                                    type="album"
                                    edit
                                />
                            </li>
                        ))}
                </ul>
            </div>
            {showAddAlbumModal && (
                <AddAlbumModal
                    onClose={handleShowAddAlbumModal}
                    onSave={handleSaveAlbum}
                />
            )}
            {showAddSongModal && (
                <AlbumSongModal
                    userId={id}
                    albumId={newAlbumId}
                    onClose={() => setShowAddSongModal(false)}
                />
            )}
            {isLoading && <Loading />}
        </section>
    );
};

export default AlbumManagement;
