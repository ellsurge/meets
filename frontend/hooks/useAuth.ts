import { useAuthStore } from '@/store/authStore';
import { trpc } from '@/utils/trpc';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import * as AppleAuthentication from 'expo-apple-authentication';

GoogleSignin.configure({
  webClientId: 'your-google-client-id.apps.googleusercontent.com',
});

export const useAuth = () => {
    const {login, logout } =  useAuthStore.getState();
    const handleNativeAuth = trpc.auth.native.useMutation({
        onSuccess: (data) => login(data.token),
        onError: (error) => console.log('Native auth error:', error),
    });

    const handleRegistration = trpc.auth.register.useMutation({
        onSuccess: () => console.log('Registration successful'),
        onError: (error) => console.log('Registration error:', error),
    });

    const handleLogin = trpc.auth.login.useMutation({
         onSuccess: (data) => login(data.token),
        onError: (error) => console.log('Login error:', error),
    });

    const onGoogleAuth = async () => {
        try {
            await GoogleSignin.hasPlayServices();
            const { data } = await GoogleSignin.signIn();
            const idToken= data?.idToken;
            if (idToken) {
                handleNativeAuth.mutate({ provider: 'google', idToken });
            }
        } catch (error) {
            console.error('Google auth error:', error);
        }
    };

    const onAppleAuth = async () => {
        try {
            const credential = await AppleAuthentication.signInAsync();
            const { identityToken } = credential;
            if (identityToken) {
                handleNativeAuth.mutate({ provider: 'apple', idToken: identityToken });
            }
        } catch (error) {
            console.error('Apple auth error:', error);
        }
    };

    return {
        onGoogleAuth,
        onAppleAuth,
        handleRegistration,
        handleLogin,
        logout
    };
};

