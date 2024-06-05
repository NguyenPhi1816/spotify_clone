import classNames from 'classnames/bind';
import styles from './Categories.module.scss';

import CategoryItem from '../CategoryItem';
import { useEffect, useState } from 'react';
import { getAllCategories } from '../../services/categoryServices';
import Loading from '../Loading';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import {
    dialogContextTypes,
    useDialogContext,
} from '../../context/DialogContext';
import { MessageType } from '../../dialog/MessageDialog/MessageDialog';

const cx = classNames.bind(styles);

function Categories() {
    const { dispatch: dialogDispatch } = useDialogContext();

    const [categories, setCategories] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        setIsLoading(true);
        getAllCategories()
            .then((res) => {
                setCategories(res.data);
            })
            .catch((error) => {
                dialogDispatch({
                    type: dialogContextTypes.SHOW_MESSAGE_DIALOG,
                    message: {
                        title: 'Có lỗi xảy ra',
                        message: error.message,
                        type: MessageType.ERROR,
                    },
                });
            })
            .finally(() => setIsLoading(false));
    }, []);

    return (
        <div className={cx('container')}>
            {!isLoading ? (
                <div className={cx('wrapper')}>
                    <div className={cx('header')}>
                        <h2>Duyệt tìm tất cả</h2>
                    </div>
                    <div className={cx('categories-container')}>
                        <ul className={cx('list')}>
                            {categories &&
                                categories.map((item) => (
                                    <li key={item.id}>
                                        <CategoryItem data={item} />
                                    </li>
                                ))}
                        </ul>
                    </div>
                </div>
            ) : (
                <SkeletonTheme
                    baseColor="var(--skeleton-base-color)"
                    highlightColor="var(--skeleton-highlight-color)"
                >
                    <Skeleton
                        height={'20px'}
                        width={'60%'}
                        style={{ margin: '32px 0 16px' }}
                    />
                    <div className={cx('list')}>
                        {new Array(12).fill(0).map((item, index) => (
                            <li key={index}>
                                <Skeleton
                                    width={'100%'}
                                    height={'100%'}
                                    style={{ borderRadius: '8px' }}
                                />
                            </li>
                        ))}
                    </div>
                </SkeletonTheme>
            )}
            {isLoading && <Loading />}
        </div>
    );
}

export default Categories;
