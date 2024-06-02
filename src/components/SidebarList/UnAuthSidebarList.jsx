import classNames from 'classnames/bind';
import styles from './SidebarList.module.scss';
import { Fragment } from 'react';
import Button from '../Button';
import { type, useAppContext } from '../../context/Context';

const cx = classNames.bind(styles);

const UnAuthSidebarList = () => {
    const { dispatch } = useAppContext();

    const handleShowAuthDialog = () => {
        dispatch({
            type: type.SHOW_AUTH_DIALOG,
            message: {
                title: '',
                message: 'Vui lòng đăng nhập để sử dụng chức năng bạn nhé',
                type: '',
            },
        });
    };

    return (
        <Fragment>
            <div className={cx('article')}>
                <h4 className={cx('acticle-title')}>
                    Tạo danh sách phát đầu tiên của bạn
                </h4>
                <p className={cx('acticle-content')}>
                    Rất dễ! Chúng tôi sẽ giúp bạn
                </p>
                <div className="btn">
                    <Button
                        onClick={handleShowAuthDialog}
                        content="Tạo danh sách phát"
                        customFontSize="14px"
                    />
                </div>
            </div>
            <div className={cx('article')}>
                <h4 className={cx('acticle-title')}>
                    Hãy cùng tìm và theo dõi một số podcast
                </h4>
                <p className={cx('acticle-content')}>
                    Chúng tôi sẽ cập nhật thông tin cho bạn về các tập mới
                </p>
                <div className="btn">
                    <Button
                        onClick={handleShowAuthDialog}
                        content="Duyệt xem Podcast"
                        customFontSize="14px"
                    />
                </div>
            </div>
        </Fragment>
    );
};

export default UnAuthSidebarList;
