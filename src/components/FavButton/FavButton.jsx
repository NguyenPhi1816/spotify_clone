import classNames from 'classnames/bind';
import styles from './FavButton.module.scss';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { useAuthContext } from '../../context/AuthContext';
import {
    dialogContextTypes,
    useDialogContext,
} from '../../context/DialogContext';

const cx = classNames.bind(styles);

const FavButton = ({
    className,
    size = '16px',
    onClick = () => {},
    isActive = false,
}) => {
    const { state: authState } = useAuthContext();
    const { dispatch: dialogDispatch } = useDialogContext();

    const handleClick = (e) => {
        e.preventDefault();
        if (authState.authData !== null) {
            onClick();
        } else {
            dialogDispatch({
                type: dialogContextTypes.SHOW_AUTH_DIALOG,
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
