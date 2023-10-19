import classNames from 'classnames/bind';
import styles from './TextEditor.module.scss';

import React from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import Button from '../Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

const cx = classNames.bind(styles);

function TextEditor({ value, setValue, onClose, onSave }) {
    return (
        <div className={cx('container')}>
            <div className={cx('wrapper')}>
                <div className={cx('header')}>
                    <h3>Chỉnh sửa lời bài hát</h3>
                    <Button
                        onClick={onClose}
                        className={cx('close-btn')}
                        noBackground
                        content={<FontAwesomeIcon icon={faTimes} />}
                    />
                </div>
                <ReactQuill
                    className={cx('react-quill')}
                    theme="snow"
                    value={value}
                    onChange={setValue}
                />
                <div className={cx('btns')}>
                    <Button onClick={onSave} content="Lưu" />
                </div>
            </div>
        </div>
    );
}

export default TextEditor;
