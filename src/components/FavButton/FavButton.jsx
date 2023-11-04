import classNames from 'classnames/bind';
import styles from './FavButton.module.scss';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import AuthenticationDialog from '../../dialog/AuthenticationDialog';
import { useAppContext } from '../../Context/Context';
import { useState } from 'react';

const cx = classNames.bind(styles);

const FavButton = ({
    className,
    size = '16px',
    onClick = () => {},
    isActive = false,
}) => {
    const { state } = useAppContext();
    const [showDialog, setShowDialog] = useState(false);

    const handleClick = (e) => {
        e.preventDefault();
        if (state.authData !== null) {
            onClick();
        } else {
            setShowDialog(true);
        }
    };

    return (
        <>
            <button
                onClick={(e) => handleClick(e)}
                className={cx('fav-btn', className)}
                style={{ fontSize: size }}
            >
                <FontAwesomeIcon
                    className={cx({ active: isActive })}
                    icon={faHeart}
                />
            </button>
            {showDialog && (
                <AuthenticationDialog
                    message={'Vui lòng đăng nhập để thích bài hát này bạn nhé'}
                    onClose={() => setShowDialog(false)}
                />
            )}
        </>
    );
};

export default FavButton;
