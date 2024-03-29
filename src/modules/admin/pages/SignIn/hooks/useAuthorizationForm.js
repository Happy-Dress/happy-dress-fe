import * as z from 'zod';
import { AUTHORIZATION_FORM_DICTIONARY } from '../components/AuthorizationForm/AuthorizationForm.dictionary';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import authenticateUser from '../../../api/authenticateUser';
import { useNavigate } from 'react-router-dom';
import { useToasters } from '../../../../../common/ui/contexts/ToastersContext';

const {
    TOO_SHORT_LOGIN_MESSAGE,
    TOO_LONG_LOGIN_MESSAGE,
    TOO_SHORT_PASSWORD_MESSAGE,
    TOO_LONG_PASSWORD_MESSAGE,
    SUCCESS_SING_IN,
} = AUTHORIZATION_FORM_DICTIONARY;

const MIN_CREDS_LENGTH = 4;
const MAX_LOGIN_LENGTH = 35;
const MAX_PASSWORD_LENGTH = 15;

const authorizationCredentials = z.object({
    login: z.string().min(MIN_CREDS_LENGTH, TOO_SHORT_LOGIN_MESSAGE).max(MAX_LOGIN_LENGTH, TOO_LONG_LOGIN_MESSAGE),
    password: z.string().min(MIN_CREDS_LENGTH, TOO_SHORT_PASSWORD_MESSAGE).max(MAX_PASSWORD_LENGTH, TOO_LONG_PASSWORD_MESSAGE),
});


const useAuthorizationForm = () => {

    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    const navigate = useNavigate();
    const { showToasterError, showToasterSuccess } = useToasters();

    const { register, setError, formState: { errors, isValid }, handleSubmit } = useForm({
        mode: 'onTouched',
        resolver: zodResolver(authorizationCredentials),
    });

    const onAuthenticateUser = async (credentials) => {
        try {
            const tokens = await authenticateUser(credentials);
            localStorage.setItem('Authorization', `Bearer ${tokens.accessToken}`);
            localStorage.setItem('refreshToken', tokens.refreshToken);
            navigate('/admin/panel/catalog-settings');
            showToasterSuccess(SUCCESS_SING_IN);
        } catch (message) {
            showToasterError(message);
        }
    };

    const onSubmit = handleSubmit(onAuthenticateUser);

    const togglePasswordVisibility = () => {
        setIsPasswordVisible(!isPasswordVisible);
    };

    return {
        onSubmit,
        register,
        setError,
        errors,
        isValid,
        isPasswordVisible,
        togglePasswordVisibility
    };
};

export default useAuthorizationForm;
