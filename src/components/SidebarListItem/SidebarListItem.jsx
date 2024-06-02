import classNames from 'classnames/bind';
import styles from './SidebarListItem.module.scss';

import { Link } from 'react-router-dom';
import { useAppContext } from '../../context/Context';

const cx = classNames.bind(styles);

const SidebarListItem = ({ data, type }) => {
    const { state } = useAppContext();

    return (
        <Link to={`/${type}/${data.id}`}>
            <div className={cx('container')}>
                <img
                    src={
                        type === 'playlist'
                            ? data.imagePath
                            : data.photoImagePath
                    }
                    alt={type === 'playlist' ? data.name : data.fullName}
                    className={cx('thumb')}
                />
                <span className={cx('info')}>
                    <h4 className={cx('header')}>
                        {type === 'playlist' ? data.name : data.fullName}
                    </h4>
                    {type === 'playlist' ? (
                        <p className={cx('footer')}>
                            Danh sách phát
                            <span className={cx('dot')}></span>
                            {state.authData.user.fullName}
                        </p>
                    ) : (
                        <p className={cx('footer')}>Nghệ sĩ</p>
                    )}
                </span>
            </div>
        </Link>
    );
};

export default SidebarListItem;
