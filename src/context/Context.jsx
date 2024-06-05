import { DialogProvider } from './DialogContext';
import { AuthProvider } from './AuthContext';
import { UserDataProvider } from './UserDataContext';
import { SongProvider } from './SongContext';
import { InteractionProvider } from './InteractionContext';

export const AppProvider = ({ children }) => {
    return (
        <InteractionProvider>
            <DialogProvider>
                <AuthProvider>
                    <UserDataProvider>
                        <SongProvider>{children}</SongProvider>
                    </UserDataProvider>
                </AuthProvider>
            </DialogProvider>
        </InteractionProvider>
    );
};
