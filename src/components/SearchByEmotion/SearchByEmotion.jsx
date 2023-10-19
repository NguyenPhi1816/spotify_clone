import classNames from 'classnames/bind';
import styles from './SearchByEmotion.module.scss';
import Button from '../Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useState } from 'react';
import { getAlbumsSongsByUserId } from '../../services/userServices';
import Song from '../Song';
import Shelf from '../Shelf';

const cx = classNames.bind(styles);

const SearchByEmotion = ({ onClose = () => {} }) => {
    const HIDDEN_SONG_NUMBERS = 5;
    const DISPLAYED_SONG_NUMBERS = 10;

    const [songs, setSongs] = useState([]);
    const [albums, setAlbums] = useState([]);
    const [numberOfSongs, setNumberOfSongs] = useState(5);
    const [isShowMore, setIsShowMore] = useState(true);

    useEffect(() => {
        getAlbumsSongsByUserId('18').then((res) => {
            setSongs(res.data.songs);
            setAlbums(res.data.albums);
        });
    }, []);

    useEffect(() => {
        if (!isShowMore) {
            setNumberOfSongs(DISPLAYED_SONG_NUMBERS);
        } else setNumberOfSongs(HIDDEN_SONG_NUMBERS);
    }, [isShowMore]);

    const handleShowMore = () => {
        setIsShowMore((prev) => !prev);
    };

    return (
        <div className={cx('container')}>
            <div className={cx('wrapper')}>
                <nav className={cx('nav')}>
                    <div>
                        <form className={cx('form')}>
                            <input
                                type="text"
                                placeholder="Cảm xúc hôm nay của bạn"
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
                            <p>Các bản nhạc liên quan đến</p>
                            <h3>Nhạc Buồn</h3>
                            <ul className={cx('song-list')}>
                                {songs
                                    .slice(0, numberOfSongs)
                                    .map((item, index) => (
                                        <li key={item.id}>
                                            <Song
                                                index={index}
                                                currentList={songs}
                                                data={item}
                                                showStreamCount
                                            />
                                        </li>
                                    ))}
                                <li>
                                    <div className={cx('show-more')}>
                                        <Button
                                            onClick={() => handleShowMore()}
                                            className={cx('hide-btn', {
                                                'show-btn': isShowMore,
                                            })}
                                            content="Xem thêm"
                                            noBackground
                                            customFontSize="14px"
                                            style={{
                                                color: 'var(--text-white)',
                                            }}
                                        />
                                        <Button
                                            onClick={() => handleShowMore()}
                                            className={cx('hide-btn', {
                                                'show-btn': !isShowMore,
                                            })}
                                            content="Ẩn bớt"
                                            noBackground
                                            customFontSize="14px"
                                            style={{
                                                color: 'var(--text-white)',
                                            }}
                                        />
                                    </div>
                                </li>
                            </ul>
                        </div>
                        <div className={cx('artist-album-container')}>
                            <Shelf
                                shelfData={{
                                    title: 'Các Album liên quan đến "Nhạc Buồn"',
                                    playlists: albums,
                                }}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SearchByEmotion;
