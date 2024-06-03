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
import { createAlbum, getAlbumById } from '../../services/albumServices';

const cx = classNames.bind(styles);

const AlbumManagement = () => {
    const { id } = useParams();
    const [data, setData] = useState([]);
    const [showAddAlbumModal, setShowAddAlbumModal] = useState(false);
    const [showAddSongModal, setShowAddSongModal] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [newAlbumId, setNewAlbumId] = useState(null);

    const handleShowAddAlbumModal = () => {
        setShowAddAlbumModal((prev) => !prev);
    };

    const handleSaveAlbum = async (value) => {
        const albumId = await createAlbum(id, value).then((res) => res.data);
        const album = await getAlbumById(albumId).then((res) => res.data);
        data.push(album);
        setNewAlbumId(albumId);
        setShowAddAlbumModal(false);
        setShowAddSongModal(true);
    };

    useEffect(() => {
        setIsLoading(true);
        getAlbumsSongsByUserId(id).then((res) => {
            setData(res.data.albums);
            setIsLoading(false);
        });
    }, [id]);

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
