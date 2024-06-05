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
import {
    dialogContextTypes,
    useDialogContext,
} from '../../context/DialogContext';
import { MessageType } from '../../dialog/MessageDialog/MessageDialog';

const cx = classNames.bind(styles);

const SearchResult = ({ searchValue, setIsLoading }) => {
    const { dispatch: dialogDispatch } = useDialogContext();

    const [result, setResult] = useState({});
    const [numberOfSongs, setNumberOfSongs] = useState(5);
    const [isShowMore, setIsShowMore] = useState(true);

    useEffect(() => {
        setIsLoading(true);
        searchByKeyword(searchValue)
            .then((res) => setResult(res.data))
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
            .finally(() => setIsLoading(false));
    }, [searchValue]);

    return (
        <div className={cx('container')}>
            <div className={cx('wrapper')}>
                <div className={cx('content')}>
                    <div>
                        {result.songs && result.songs.length > 0 && (
                            <div className={cx('song-container')}>
                                <p>Các bản nhạc liên quan đến</p>
                                <h3>"{searchValue}"</h3>
                                <ul className={cx('song-list')}>
                                    {result.songs
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
                        )}
                        {result.albums && result.albums.length > 0 && (
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
                        )}
                        {result.playlists && result.playlists.length > 0 && (
                            <div className={cx('artist-album-container')}>
                                <Shelf
                                    title={`Các danh sách phát liên quan đến "${searchValue}"`}
                                >
                                    {result.playlists.map((item) => (
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
                        )}
                        {result.users && result.users.length > 0 && (
                            <div className={cx('artist-album-container')}>
                                <Shelf
                                    title={`Các nghệ sĩ liên quan đến "${searchValue}"`}
                                >
                                    {result.users.map((item) => (
                                        <li key={item.id}>
                                            <ArtistCard data={item} />
                                        </li>
                                    ))}
                                </Shelf>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SearchResult;
