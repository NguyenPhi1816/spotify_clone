import classNames from 'classnames/bind';
import styles from './SearchByEmotion.module.scss';
import Button from '../Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useState } from 'react';
import { getAlbumsSongsByUserId } from '../../services/userServices';
import Song from '../Song';
import Shelf from '../Shelf';
import Loading from '../Loading';
import useDebounce from '../../hooks/useDebounce';
import { searchBySentiment } from '../../services/songServices';

const cx = classNames.bind(styles);

const SearchByEmotion = ({ onClose = () => {} }) => {
    const NUMBER_OF_SONGS = 5;

    const [songs, setSongs] = useState([]);
    const [numberOfSongs, setNumberOfSongs] = useState(5);
    const [isShowMore, setIsShowMore] = useState(true);
    const [isLoading, setIsLoading] = useState(false);
    const [searchValue, setSearchValue] = useState('');

    const debounceValue = useDebounce(searchValue, 500);

    const handleChangeSearchValue = (e) => {
        const value = e.target.value;
        if (!value.startsWith(' ')) setSearchValue(value);
    };

    useEffect(() => {
        if (debounceValue !== '') {
            setIsLoading(true);
            searchBySentiment(debounceValue).then((res) => setSongs(res.data));
            setIsLoading(false);
        }
    }, [debounceValue]);

    useEffect(() => {
        setIsShowMore(numberOfSongs < songs.length);
    }, [numberOfSongs, songs]);

    const handleShowMore = () => {
        if (numberOfSongs < songs.length) {
            setNumberOfSongs((prev) => {
                if (prev + NUMBER_OF_SONGS <= songs.length)
                    return prev + NUMBER_OF_SONGS;
                else return songs.length;
            });
        } else {
            setNumberOfSongs(NUMBER_OF_SONGS);
        }
    };

    return (
        <div className={cx('container')}>
            <div className={cx('wrapper')}>
                <nav className={cx('nav')}>
                    <div>
                        <form className={cx('form')}>
                            <input
                                type="text"
                                value={searchValue}
                                onChange={(e) => handleChangeSearchValue(e)}
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
                        {songs.length > 0 && (
                            <div className={cx('song-container')}>
                                <p>Các bản nhạc liên quan đến</p>
                                <h3>{debounceValue}</h3>
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
                        )}
                    </div>
                    {isLoading && <Loading />}
                </div>
            </div>
        </div>
    );
};

export default SearchByEmotion;
