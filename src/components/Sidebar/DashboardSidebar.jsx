import classNames from 'classnames/bind';
import styles from './DashboardSidebar.module.scss';
import { Link, useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faChartSimple,
    faHouse,
    faMusic,
} from '@fortawesome/free-solid-svg-icons';
import { useAuthContext } from '../../context/AuthContext';

const cx = classNames.bind(styles);

const DashboardSidebar = () => {
    const { state: authState } = useAuthContext();
    const currentPath = useLocation().pathname;

    return (
        <nav className={cx('container')}>
            <div className={cx('item', 'top')}>
                <ul className={cx('top-list')}>
                    <li className={cx('list-item')}>
                        <Link to="/">
                            <span className={cx('logo')}>
                                <img
                                    src={import.meta.env.VITE_LOGO_PRIMARY_URL}
                                />
                                <span>Spotify</span>
                            </span>
                        </Link>
                    </li>
                    <li>
                        <div className={cx('avatar')}>
                            <div>
                                <img
                                    src={
                                        authState.authData &&
                                        authState.authData.user.photoImagePath
                                    }
                                    alt={
                                        authState.authData &&
                                        authState.authData.user.fullName
                                    }
                                />
                            </div>
                            <h2>
                                {authState.authData &&
                                    authState.authData.user.fullName}
                            </h2>
                        </div>
                    </li>
                    <li
                        className={cx('list-item', {
                            active: currentPath === '/',
                        })}
                    >
                        <Link to="/">
                            <FontAwesomeIcon icon={faHouse} />
                            <span>Trang chủ</span>
                        </Link>
                    </li>
                    <li
                        className={cx('list-item', {
                            active: currentPath.includes('/dashboard'),
                        })}
                    >
                        <Link
                            to={`/dashboard/${
                                authState.authData && authState.authData.user.id
                            }`}
                        >
                            <FontAwesomeIcon icon={faChartSimple} />
                            <span>Metrics</span>
                        </Link>
                    </li>
                    <li
                        className={cx('list-item', {
                            active: currentPath.includes('/management'),
                        })}
                    >
                        <Link
                            to={`/management/${
                                authState.authData && authState.authData.user.id
                            }`}
                        >
                            <FontAwesomeIcon icon={faMusic} />
                            <span>Music</span>
                        </Link>
                    </li>
                </ul>
            </div>
        </nav>
    );
};

export default DashboardSidebar;
