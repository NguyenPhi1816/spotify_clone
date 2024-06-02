import { useAppContext } from '../../context/Context';
import AuthenticationDialog from '../../dialog/AuthenticationDialog/AuthenticationDialog';
import MessageDialog from '../../dialog/MessageDialog';
import PropTypes from 'prop-types';

const DialogManager = ({ children }) => {
    const { state } = useAppContext();

    return (
        <>
            {state.isShowMessageDialog && (
                <MessageDialog
                    title={state.message.title}
                    message={state.message.message}
                    type={state.message.type}
                />
            )}
            {state.isShowAuthDialog && (
                <AuthenticationDialog message={state.message.message} />
            )}
            {children}
        </>
    );
};

DialogManager.propTypes = {
    children: PropTypes.element,
};

export default DialogManager;
