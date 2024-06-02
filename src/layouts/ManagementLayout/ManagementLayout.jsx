import classNames from 'classnames/bind';
import styles from './ManagementLayout.module.scss';
import { useAppContext } from '../../context/Context';

const cx = classNames.bind(styles);

function ManagementLayout({ Sidebar, Navbar, Content }) {
    return (
        <div className={cx('container')}>
            <div className={cx('sidebar')}>{Sidebar}</div>
            <div className={cx('main-view')}>
                <div className={cx('navbar')}>{Navbar}</div>
                <div className={cx('content')}>{Content}</div>
            </div>
        </div>
    );
}

export default ManagementLayout;
