import classNames from 'classnames/bind';
import styles from './ShelfItem.module.scss';

import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import PlayButton from '../PlayButton';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen } from '@fortawesome/free-solid-svg-icons';
import { useAppContext } from '../../context/Context';
import { getPlaylistById } from '../../services/playlistServices';
import { type as contextType } from '../../context/Context';
import { getAlbumById } from '../../services/albumServices';

const cx = classNames.bind(styles);

function ShelfItem({ type, shelfItemData = {}, edit = false }) {
    const PLAYLIST = 'playlist';
    const ALBUM = 'album';

    const { state, dispatch } = useAppContext();
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

        if (state.currentPlayingPath !== `/${type}/${data.id}`) {
            dispatch({
                type: contextType.LOAD_SONG,
                currentPlayingPath: `/${type}/${data.id}`,
                currentPlayingList: list,
                currentPlayingSongIndex: 0,
            });
        } else {
            if (!state.isPlaying) {
                dispatch({ type: contextType.PLAY_SONG });
            } else {
                dispatch({ type: contextType.PAUSE_SONG });
            }
        }
    };

    useEffect(() => {
        if (state.currentPlayingPath === `/${type}/${data.id}`) {
            setIsPlaying(state.isPlaying);
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
