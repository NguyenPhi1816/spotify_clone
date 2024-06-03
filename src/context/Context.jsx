import { DialogProvider } from './DialogContext';
import { AuthProvider } from './AuthContext';
import { UserDataProvider } from './UserDataContext';
import { SongProvider } from './SongContext';

export const AppProvider = ({ children }) => {
    return (
        <DialogProvider>
            <AuthProvider>
                <UserDataProvider>
                    <SongProvider>{children}</SongProvider>
                </UserDataProvider>
            </AuthProvider>
        </DialogProvider>
    );
};
