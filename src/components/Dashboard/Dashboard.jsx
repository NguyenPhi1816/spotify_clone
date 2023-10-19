import classNames from 'classnames/bind';
import styles from './Dashboard.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faArrowTrendDown,
    faArrowTrendUp,
} from '@fortawesome/free-solid-svg-icons';
import LineChart from '../Chart/LineChart';
import VerticalBarChart from '../Chart/VerticalBarChart';

const cx = classNames.bind(styles);

const Dashboard = () => {
    return (
        <section className={cx('container')}>
            <h1 className={cx('title')}>MY METRICS</h1>
            <div>
                <form className={cx('form')}>
                    <div className={cx('form-group')}>
                        <p>Search by</p>
                        <select>
                            <option value="until today">Until today</option>
                            <option value="until today">Until today</option>
                            <option value="until today">Until today</option>
                        </select>
                    </div>
                    <div className={cx('form-group')}>
                        <p>Title</p>
                        <select>
                            <option value="until today">Until today</option>
                            <option value="until today">Until today</option>
                            <option value="until today">Until today</option>
                        </select>
                    </div>
                    <div className={cx('form-group')}>
                        <p>Date</p>
                        <select>
                            <option value="until today">Until today</option>
                            <option value="until today">Until today</option>
                            <option value="until today">Until today</option>
                        </select>
                    </div>
                    <input type="submit" value="Filter" />
                </form>
            </div>
            <div className={cx('listeners')}>
                <div className={cx('listeners-monthly')}>
                    <div className={cx('header')}>
                        <h4>Monthly listeners</h4>
                        <span>april 2019</span>
                    </div>
                    <div className={cx('body')}>
                        <span>4.945.499</span>
                    </div>
                    <div className={cx('footer')}>
                        <FontAwesomeIcon icon={faArrowTrendDown} />
                        <span>-12,4%</span>
                    </div>
                </div>
                <div className={cx('listeners-percentage')}>
                    <div className={cx('header')}>
                        <h4>Listening percentage</h4>
                    </div>
                    <div className={cx('body')}>
                        <span className={cx('percentage')}></span>
                        <div className={cx('info')}>
                            <div className={cx('dynamic-percent')}>
                                <p>85%</p>
                            </div>
                            <div className={cx('static-percent')}>
                                <span className={cx('trend')}>
                                    <FontAwesomeIcon icon={faArrowTrendUp} />
                                    <p>+17%</p>
                                </span>
                                <span>100%</span>
                            </div>
                        </div>
                    </div>
                    <div className={cx('footer')}>
                        <p>This week</p>
                    </div>
                </div>
                <div className={cx('listeners-weekly')}>
                    <div className={cx('header')}>
                        <h4>Weekly listeners</h4>
                    </div>
                    <div className={cx('chart')}>
                        <LineChart />
                    </div>
                </div>
            </div>
            <div className={cx('visitors')}>
                <div className={cx('visitors-chart')}>
                    <div className={cx('header')}>
                        <h4>Weekly profile visitors</h4>
                    </div>
                    <div className={cx('chart')}>
                        <VerticalBarChart />
                    </div>
                </div>
                <div className={cx('visitors-most-popular')}>
                    <div className={cx('header')}>
                        <h4>Most popular</h4>
                        <p>april 2019</p>
                    </div>
                    <div>
                        <ul className={cx('list')}>
                            <li>
                                <div className={cx('list-item')}>
                                    <span>
                                        <p>1.</p>
                                        <p>Smile</p>
                                    </span>
                                    <p>74.000.000</p>
                                </div>
                            </li>
                            <li>
                                <div className={cx('list-item')}>
                                    <span>
                                        <p>2.</p>
                                        <p>Smile</p>
                                    </span>
                                    <p>74.000.000</p>
                                </div>
                            </li>
                            <li>
                                <div className={cx('list-item')}>
                                    <span>
                                        <p>3.</p>
                                        <p>Smile</p>
                                    </span>
                                    <p>74.000.000</p>
                                </div>
                            </li>
                            <li>
                                <div className={cx('list-item')}>
                                    <span>
                                        <p>4.</p>
                                        <p>Smile</p>
                                    </span>
                                    <p>74.000.000</p>
                                </div>
                            </li>
                            <li>
                                <div className={cx('list-item')}>
                                    <span>
                                        <p>5.</p>
                                        <p>Smile</p>
                                    </span>
                                    <p>74.000.000</p>
                                </div>
                            </li>
                            <li>
                                <div className={cx('list-item')}>
                                    <span>
                                        <p>6.</p>
                                        <p>Smile</p>
                                    </span>
                                    <p>74.000.000</p>
                                </div>
                            </li>
                            <li>
                                <div className={cx('list-item')}>
                                    <span>
                                        <p>7.</p>
                                        <p>Smile</p>
                                    </span>
                                    <p>74.000.000</p>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Dashboard;
