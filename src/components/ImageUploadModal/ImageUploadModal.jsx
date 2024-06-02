import classNames from 'classnames/bind';
import styles from './ImageUploadModal.module.scss';

import { useState } from 'react';
import Button from '../Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import MessageDialog from '../../dialog/MessageDialog';

const cx = classNames.bind(styles);

export default function ImageUploadModal({ handleUploadFile, onClose }) {
    const [file, setFile] = useState(null);
    const [message, setMessage] = useState('');
    const [showMessageDialog, setShowMessageDialog] = useState(false);

    const handleChange = (e) => {
        const myfile = e.target.files[0];
        if (myfile['type'].includes('image/')) {
            setFile(myfile);
        } else {
            setMessage('Tệp không được hỗ trợ');
            setShowMessageDialog(true);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        handleUploadFile(file);
    };

    return (
        <div className={cx('container')}>
            <div className={cx('wrapper')}>
                <div className={cx('header')}>
                    <h3>Chọn ảnh để tải lên</h3>
                    <Button
                        noBackground
                        onClick={onClose}
                        style={{ padding: '10px', color: 'var(--text-white)' }}
                        content={<FontAwesomeIcon icon={faTimes} />}
                    />
                </div>
                <div className={cx('body')}>
                    <form className={cx('form')} encType="multipart/form-data">
                        <div className={cx('file-drop-area')}>
                            <div
                                className={cx('selected-image')}
                                onClick={() =>
                                    document
                                        .getElementById('file-input')
                                        .click()
                                }
                            >
                                {file && (
                                    <img
                                        src={URL.createObjectURL(file)}
                                        alt="Selected"
                                    />
                                )}
                            </div>
                            <span className={cx('fake-btn')}>Choose files</span>
                            <span className={cx('file-msg')}>
                                {file
                                    ? file.name
                                    : 'or drag and drop files here'}
                            </span>
                            <input
                                id="file-input"
                                className={cx('file-input')}
                                type="file"
                                onChange={(e) => handleChange(e)}
                                accept="image/*"
                            />
                        </div>
                        <input
                            type="submit"
                            onClick={(e) => handleSubmit(e)}
                            value="Tải ảnh lên"
                        />
                    </form>
                </div>
            </div>
        </div>
    );
}
