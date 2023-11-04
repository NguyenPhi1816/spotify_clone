import classNames from 'classnames/bind';
import styles from './DashboardSong.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen, faPlus, faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import { Fragment, useState } from 'react';
import ConfirmationDialog from '../../dialog/ConfirmationDialog/ConfirmationDialog';

const cx = classNames.bind(styles);

const DashboardSong = ({
    className,
    index,
    data,
    addButton = false,
    deleteButton = false,
    toggleButton = false,
    onAddSong = () => {},
    onRemoveSong = () => {},
}) => {
    const [isActive, setIsActive] = useState(true);
    const [showConfirm, setShowConfirm] = useState(false);

    const calculateCreatedDate = (createdDateStr) => {
        const [datePart, timePart] = createdDateStr.split(' ');
        const [day, month, year] = datePart.split('/');
        const newDate = month + '/' + day + '/' + year + ' ' + timePart;

        const createdDate = new Date(newDate);
        const currentDate = new Date();
        const diff = currentDate - createdDate;
        const daysDiff = Math.floor(diff / (1000 * 60 * 60 * 24));

        let output = '';

        if (daysDiff < 30) {
            output = daysDiff + ' ngày trước';
        } else if (daysDiff < 365) {
            let months = Math.floor(daysDiff / 30);
            output = months + ' tháng trước';
        } else {
            let years = Math.floor(daysDiff / 365);
            output = years + ' năm trước';
        }

        return output;
    };

    const handleToggleBtn = () => {
        setShowConfirm((prev) => !prev);
    };

    const handleShowHideSong = () => {
        setIsActive((prev) => !prev);
    };

    return (
        <div className={cx('container', className)}>
            <div className={cx('wrapper')}>
                <div className={cx('col1')}>
                    <span className={cx('index')}>{index + 1}</span>
                </div>
                <div className={cx('first', 'col2')}>
                    <img
                        className={cx('thumb')}
                        src={data.imagePath}
                        alt={data.name}
                    />
                    <div className={cx('var1')}>
                        <p className={cx('name')}>{data.name}</p>
                        <div className={cx('artists')}>
                            {data.users &&
                                data.users.map((artist, index) => (
                                    <Fragment key={artist.id}>
                                        <Link to={`/artist/${artist.id}`}>
                                            {artist.firstName +
                                                ' ' +
                                                artist.lastName}
                                        </Link>
                                        {index < data.users.length - 1 && (
                                            <p>, </p>
                                        )}
                                    </Fragment>
                                ))}
                        </div>
                    </div>
                </div>
                <div className={cx('stream-count', 'col3')}>
                    <p>{data.viewCount}</p>
                </div>
                <p className={cx('created-at', 'col4')}>
                    {calculateCreatedDate(data.releaseDate)}
                </p>

                <div className={cx('last', 'col5')}>
                    <p className={cx('duration')}>{data.duration}</p>
                    <Link to={`/track/${data.id}/edit`} className={cx('edit')}>
                        <FontAwesomeIcon icon={faPen} />
                    </Link>
                    {deleteButton && (
                        <span
                            className={cx('remove')}
                            onClick={() => onRemoveSong(data.id)}
                        >
                            <FontAwesomeIcon icon={faTrashCan} />
                        </span>
                    )}
                    {addButton && (
                        <span
                            className={cx('add')}
                            onClick={() => onAddSong(data.id)}
                        >
                            <FontAwesomeIcon icon={faPlus} />
                        </span>
                    )}
                    {toggleButton && (
                        <span
                            className={cx('toggle')}
                            onClick={handleToggleBtn}
                        >
                            <span className={cx('toggle-btn')}>
                                <span
                                    className={cx('toggle-thumb', {
                                        'toggle-thumb-active': isActive,
                                    })}
                                ></span>
                            </span>
                        </span>
                    )}
                </div>
            </div>

            {showConfirm && (
                <ConfirmationDialog
                    message={`Bạn chắc chắn muốn ${
                        isActive ? 'ẩn' : 'hiện'
                    } bài hát này?`}
                    setShow={setShowConfirm}
                    onConfirm={handleShowHideSong}
                />
            )}
        </div>
    );
};

export default DashboardSong;
