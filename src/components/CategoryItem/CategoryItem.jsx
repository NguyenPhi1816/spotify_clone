import classNames from 'classnames/bind';
import styles from './CategoryItem.module.scss';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const cx = classNames.bind(styles);

function CategoryItem({ data = {} }) {
    const [randomColor, setRandomColor] = useState('');

    const generateRandomColor = () => {
        const randomColor =
            '#' + Math.floor(Math.random() * 16777215).toString(16); // Generates a random hex color code
        return randomColor;
    };

    useEffect(() => {
        setRandomColor(generateRandomColor);
    }, []);

    return (
        <Link to={`/genre/${data.id}`} className={cx('link')}>
            <div
                className={cx('container')}
                style={{ backgroundColor: randomColor }}
            >
                <div className={cx('title')}>
                    <h4>{data.title}</h4>
                </div>
                <div className={cx('thumb')}>
                    <img src={data.thumb} />
                </div>
            </div>
        </Link>
    );
}

export default CategoryItem;
