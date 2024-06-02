import classNames from 'classnames/bind';
import styles from './CustomSpinner.module.scss';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const cx = classNames.bind(styles);

const CustomSpinner = () => {
    return <FontAwesomeIcon icon={faSpinner} className={cx('spinner')} />;
};

export default CustomSpinner;
