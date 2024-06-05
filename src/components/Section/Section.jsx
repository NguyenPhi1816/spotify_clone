import classNames from 'classnames/bind';
import styles from './Section.module.scss';
import { useLocation, useParams } from 'react-router-dom';
import ShelfItem from '../ShelfItem';
import { useEffect, useState } from 'react';
import { getCategoriesById } from '../../services/categoryServices';
import { getAlbumsSongsByUserId } from '../../services/userServices';
import {
    dialogContextTypes,
    useDialogContext,
} from '../../context/DialogContext';
import { MessageType } from '../../dialog/MessageDialog/MessageDialog';

const cx = classNames.bind(styles);

const Section = () => {
    const { dispatch: dialogDispatch } = useDialogContext();

    const { id } = useParams();
    const location = useLocation();
    const [type, setType] = useState('');
    const [data, setData] = useState({});

    useEffect(() => {
        if (location.pathname === `/section/${id}`) {
            setType('playlist');
            getCategoriesById(id)
                .then((res) => setData(res.data))
                .catch((error) => {
                    dialogDispatch({
                        type: dialogContextTypes.SHOW_MESSAGE_DIALOG,
                        message: {
                            title: 'Có lỗi xảy ra',
                            message: error.message,
                            type: MessageType.ERROR,
                        },
                    });
                });
        } else if (location.pathname === `/artist/${id}/album`) {
            setType('album');
            getAlbumsSongsByUserId(id)
                .then((res) => {
                    setData({
                        title: 'Danh sách album',
                        playlists: res.data.albums,
                    });
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
                });
        }
    }, [id]);

    return (
        <section className={cx('container')}>
            <div className={cx('title')}>
                <h2>{data.title}</h2>
            </div>
            <div>
                <ul className={cx('list')}>
                    {data.playlists?.map((item) => (
                        <li key={item.id}>
                            <ShelfItem type={type} shelfItemData={item} />
                        </li>
                    ))}
                </ul>
            </div>
        </section>
    );
};

export default Section;
