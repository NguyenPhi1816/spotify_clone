import classNames from 'classnames/bind';
import styles from './AlbumManagement.module.scss';
import { useParams } from 'react-router-dom';
import ShelfItem from '../ShelfItem';
import { useEffect, useState } from 'react';
import { getAlbumsSongsByUserId } from '../../services/userServices';
import Button from '../Button';
import AlbumSongModal from '../AlbumSongModal';
import AddAlbumModal from '../AddAlbumModal';

const cx = classNames.bind(styles);

const AlbumManagement = () => {
    const { id } = useParams();
    const [data, setData] = useState([]);
    const [showAddAlbumModal, setShowAddAlbumModal] = useState(false);
    const [showAddSongModal, setShowAddSongModal] = useState(false);

    const handleShowAddAlbumModal = () => {
        setShowAddAlbumModal((prev) => !prev);
    };

    const handleSaveAlbum = () => {
        console.log('album saved!');
        setShowAddAlbumModal(false);
        setShowAddSongModal(true);
    };

    useEffect(() => {
        getAlbumsSongsByUserId(id).then((res) => setData(res.data.albums));
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
                <AlbumSongModal onClose={() => setShowAddSongModal(false)} />
            )}
        </section>
    );
};

export default AlbumManagement;
