import classNames from 'classnames/bind';
import styles from './CategoryItem.module.scss';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const cx = classNames.bind(styles);

function CategoryItem({ data = {} }) {
    const BLACK = '#000000';
    const WHITE = '#ffffff';

    const [randomColor, setRandomColor] = useState('');

    const generateRandomColor = () => {
        let threshold = 50;

        while (true) {
            let red = Math.floor(Math.random() * 256);
            let green = Math.floor(Math.random() * 256);
            let blue = Math.floor(Math.random() * 256);

            if (
                (red > 255 - threshold &&
                    green > 255 - threshold &&
                    blue > 255 - threshold) ||
                (red < threshold && green < threshold && blue < threshold)
            ) {
                continue;
            }

            let hexColor =
                '#' +
                ((1 << 24) | (red << 16) | (green << 8) | blue)
                    .toString(16)
                    .slice(1);

            return hexColor;
        }
    };

    useEffect(() => {
        setRandomColor(generateRandomColor);
    }, []);

    return (
        <Link to={`/genre/${data.id}/${data.title}`} className={cx('link')}>
            <div
                className={cx('container')}
                style={{ backgroundColor: randomColor }}
            >
                <div className={cx('title')}>
                    <h4>{data.title}</h4>
                </div>
                <div className={cx('thumb')}>
                    <img src={data.imagePath} />
                </div>
            </div>
        </Link>
    );
}

export default CategoryItem;
