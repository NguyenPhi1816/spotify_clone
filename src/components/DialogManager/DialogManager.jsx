import { useDialogContext } from '../../context/DialogContext';
import AuthenticationDialog from '../../dialog/AuthenticationDialog/AuthenticationDialog';
import MessageDialog from '../../dialog/MessageDialog';
import PropTypes from 'prop-types';

const DialogManager = ({ children }) => {
    const { state: dialogState } = useDialogContext();

    return (
        <>
            {dialogState.isShowMessageDialog && (
                <MessageDialog
                    title={dialogState.message.title}
                    message={dialogState.message.message}
                    type={dialogState.message.type}
                />
            )}
            {dialogState.isShowAuthDialog && (
                <AuthenticationDialog message={dialogState.message.message} />
            )}
            {children}
        </>
    );
};

DialogManager.propTypes = {
    children: PropTypes.element,
};

export default DialogManager;
