import classNames from 'classnames/bind';
import styles from './Categories.module.scss';

import CategoryItem from '../CategoryItem';
import { useEffect, useState } from 'react';
import { getAllCategories } from '../../services/categoryServices';
import Loading from '../Loading';

const cx = classNames.bind(styles);

function Categories() {
    const [categories, setCategories] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        setIsLoading(true);
        getAllCategories().then((res) => {
            setCategories(res.data);
            setIsLoading(false);
        });
    }, []);

    return (
        <div className={cx('container')}>
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
            {isLoading && <Loading />}
        </div>
    );
}

export default Categories;
