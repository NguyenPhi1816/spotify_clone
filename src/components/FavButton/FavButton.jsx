import classNames from 'classnames/bind';
import styles from './FavButton.module.scss';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { type, useAppContext } from '../../context/Context';

const cx = classNames.bind(styles);

const FavButton = ({
    className,
    size = '16px',
    onClick = () => {},
    isActive = false,
}) => {
    const { state, dispatch } = useAppContext();

    const handleClick = (e) => {
        e.preventDefault();
        if (state.authData !== null) {
            onClick();
        } else {
            dispatch({
                type: type.SHOW_AUTH_DIALOG,
                message: {
                    title: '',
                    message:
                        'Vui lòng đăng nhập để thực hiện chức năng này bạn nhé',
                    type: '',
                },
            });
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
        </>
    );
};

export default FavButton;
