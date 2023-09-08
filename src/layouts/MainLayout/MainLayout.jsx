import classNames from 'classnames/bind';
import styles from './MainLayout.module.scss';

const cx = classNames.bind(styles);

function MainLayout({ Sidebar, Navbar, Content, Playbar }) {
    return (
        <div className={cx('container')}>
            <div className={cx('sidebar')}>{Sidebar}</div>
            <div className={cx('main-view')}>
                <div className={cx('navbar')}>{Navbar}</div>
                <div className={cx('content')}>{Content}</div>
            </div>
            <div className={cx('playbar')}>{Playbar}</div>
        </div>
    );
}

export default MainLayout;
