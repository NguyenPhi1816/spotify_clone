import classNames from 'classnames/bind';
import styles from './ShelfItem.module.scss';

import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import PlayButton from '../PlayButton';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen } from '@fortawesome/free-solid-svg-icons';
import { getPlaylistById } from '../../services/playlistServices';
import { getAlbumById } from '../../services/albumServices';
import { songContextTypes, useSongContext } from '../../context/SongContext';

const cx = classNames.bind(styles);

function ShelfItem({ type, shelfItemData = {}, edit = false }) {
    const PLAYLIST = 'playlist';
    const ALBUM = 'album';

    const { state: songState, dispatch: songDispatch } = useSongContext();

    const [data, setData] = useState({});
    const [isPlaying, setIsPlaying] = useState(false);

    useEffect(() => {
        setData({ ...shelfItemData });
    }, [shelfItemData]);

    const handlePlayList = async () => {
        let list = [];
        if (type === PLAYLIST)
            list = await getPlaylistById(data.id).then((res) => res.data.songs);
        if (type === ALBUM)
            list = await getAlbumById(data.id).then((res) => res.data.songs);

        if (songState.currentPlayingPath !== `/${type}/${data.id}`) {
            songDispatch({
                type: songContextTypes.LOAD_SONG,
                currentPlayingPath: `/${type}/${data.id}`,
                currentPlayingList: list,
                currentPlayingSongIndex: 0,
            });
        } else {
            if (!songState.isPlaying) {
                songDispatch({ type: songContextTypes.PLAY_SONG });
            } else {
                songDispatch({ type: songContextTypes.PAUSE_SONG });
            }
        }
    };

    useEffect(() => {
        if (songState.currentPlayingPath === `/${type}/${data.id}`) {
            setIsPlaying(songState.isPlaying);
        } else {
            setIsPlaying(false);
        }
    });

    return (
        <Link
            to={`/${type}/${data.id}${edit ? '/edit' : ''}`}
            className={cx('link')}
        >
            <div className={cx('container')}>
                <div className={cx('top')}>
                    <div className={cx('thumb-container')}>
                        <img src={data.imagePath} alt={data.name} />
                    </div>
                    <div className={cx('play-btn')}>
                        {!edit && (
                            <PlayButton
                                isPlaying={isPlaying}
                                onClick={handlePlayList}
                                currentIndex={0}
                                size="48px"
                            />
                        )}
                        {edit && (
                            <button>
                                <FontAwesomeIcon icon={faPen} />
                            </button>
                        )}
                    </div>
                </div>
                <div className={cx('body')}>
                    <h3 className={cx('title')}>{data.name}</h3>
                    <p className={cx('desc')}>{data.description}</p>
                </div>
            </div>
        </Link>
    );
}

export default ShelfItem;
