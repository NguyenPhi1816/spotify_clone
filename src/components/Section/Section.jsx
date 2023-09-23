import classNames from 'classnames/bind';
import styles from './Section.module.scss';
import { useParams } from 'react-router-dom';
import ShelfItem from '../ShelfItem';

const cx = classNames.bind(styles);

const Section = () => {
    const id = useParams();

    const data = {
        id: 2,
        title: 'Danh sách phát trên Spotify',
        items: [
            {
                id: 1,
                imagePath: '../src/assets/images/den_vau.jpg',
                name: "Today's Top Hits",
                description: 'Doja Cat is on top of the Hottest 50!',
            },
            {
                id: 2,
                imagePath: '../src/assets/images/den_vau.jpg',
                name: "Today's Top Hits",
                description: 'Doja Cat is on top of the Hottest 50!',
            },
            {
                id: 3,
                imagePath: '../src/assets/images/den_vau.jpg',
                name: "Today's Top Hits",
                description: 'Doja Cat is on top of the Hottest 50!',
            },
            {
                id: 4,
                imagePath: '../src/assets/images/den_vau.jpg',
                name: "Today's Top Hits",
                description: 'Doja Cat is on top of the Hottest 50!',
            },
            {
                id: 5,
                imagePath: '../src/assets/images/den_vau.jpg',
                name: "Today's Top Hits",
                description: 'Doja Cat is on top of the Hottest 50!',
            },
            {
                id: 6,
                imagePath: '../src/assets/images/den_vau.jpg',
                name: "Today's Top Hits",
                description: 'Doja Cat is on top of the Hottest 50!',
            },
            {
                id: 7,
                imagePath: '../src/assets/images/den_vau.jpg',
                name: "Today's Top Hits",
                description: 'Doja Cat is on top of the Hottest 50!',
            },
            {
                id: 8,
                imagePath: '../src/assets/images/den_vau.jpg',
                name: "Today's Top Hits",
                description: 'Doja Cat is on top of the Hottest 50!',
            },
            {
                id: 9,
                imagePath: '../src/assets/images/den_vau.jpg',
                name: "Today's Top Hits",
                description: 'Doja Cat is on top of the Hottest 50!',
            },
            {
                id: 10,
                imagePath: '../src/assets/images/den_vau.jpg',
                name: "Today's Top Hits",
                description: 'Doja Cat is on top of the Hottest 50!',
            },
            {
                id: 11,
                imagePath: '../src/assets/images/den_vau.jpg',
                name: "Today's Top Hits",
                description: 'Doja Cat is on top of the Hottest 50!',
            },
            {
                id: 12,
                imagePath: '../src/assets/images/den_vau.jpg',
                name: "Today's Top Hits",
                description: 'Doja Cat is on top of the Hottest 50!',
            },
            {
                id: 13,
                imagePath: '../src/assets/images/den_vau.jpg',
                name: "Today's Top Hits",
                description: 'Doja Cat is on top of the Hottest 50!',
            },
            {
                id: 14,
                imagePath: '../src/assets/images/den_vau.jpg',
                name: "Today's Top Hits",
                description: 'Doja Cat is on top of the Hottest 50!',
            },
            {
                id: 15,
                imagePath: '../src/assets/images/den_vau.jpg',
                name: "Today's Top Hits",
                description: 'Doja Cat is on top of the Hottest 50!',
            },
        ],
    };

    return (
        <section className={cx('container')}>
            <div className={cx('title')}>
                <h2>{data.title}</h2>
            </div>
            <div>
                <ul className={cx('list')}>
                    {data.items.map((item) => (
                        <li key={item.id}>
                            <ShelfItem shelfItemData={item} />
                        </li>
                    ))}
                </ul>
            </div>
        </section>
    );
};

export default Section;
