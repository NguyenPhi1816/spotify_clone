import classNames from 'classnames/bind';
import styles from './SearchResult.module.scss';

import { useEffect, useState } from 'react';
import { searchByKeyword } from '../../services/categoryServices';
import Button from '../Button';
import Song from '../Song';
import Shelf from '../Shelf';
import Loading from '../Loading';
import ArtistCard from '../ArtistCard/ArtistCard';
import ShelfItem from '../ShelfItem';

const cx = classNames.bind(styles);

const SearchResult = ({ searchValue }) => {
    const [result, setResult] = useState({});
    const [numberOfSongs, setNumberOfSongs] = useState(5);
    const [isShowMore, setIsShowMore] = useState(true);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        setIsLoading(true);
        searchByKeyword(searchValue).then((res) => setResult(res.data));
        setIsLoading(false);
    }, [searchValue]);

    return (
        <div className={cx('container')}>
            <div className={cx('wrapper')}>
                <div className={cx('content')}>
                    <div>
                        <div className={cx('song-container')}>
                            <p>Các bản nhạc liên quan đến</p>
                            <h3>"{searchValue}"</h3>
                            <ul className={cx('song-list')}>
                                {result.songs &&
                                    result.songs
                                        .slice(0, numberOfSongs)
                                        .map((item, index) => (
                                            <li key={item.id}>
                                                <Song
                                                    index={index}
                                                    currentList={result.songs}
                                                    data={item}
                                                    showArtists
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
                                title={`Các Album liên quan đến "${searchValue}"`}
                            >
                                {result.albums &&
                                    result.albums.map((item) => (
                                        <li key={item.id}>
                                            <ShelfItem
                                                shelfItemData={item}
                                                edit={false}
                                                type="album"
                                            />
                                        </li>
                                    ))}
                            </Shelf>
                        </div>
                        <div className={cx('artist-album-container')}>
                            <Shelf
                                title={`Các danh sách phát liên quan đến "${searchValue}"`}
                            >
                                {result.playlists &&
                                    result.playlists.map((item) => (
                                        <li key={item.id}>
                                            <ShelfItem
                                                shelfItemData={item}
                                                edit={false}
                                                type="playlist"
                                            />
                                        </li>
                                    ))}
                            </Shelf>
                        </div>
                        <div className={cx('artist-album-container')}>
                            <Shelf
                                title={`Các nghệ sĩ liên quan đến "${searchValue}"`}
                            >
                                {result.users &&
                                    result.users.map((item) => (
                                        <li key={item.id}>
                                            <ArtistCard data={item} />
                                        </li>
                                    ))}
                            </Shelf>
                        </div>
                    </div>
                    {isLoading && <Loading />}
                </div>
            </div>
        </div>
    );
};

export default SearchResult;
