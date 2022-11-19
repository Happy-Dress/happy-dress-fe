import * as z from 'zod';
import { AUTHORIZATION_FORM_DICTIONARY } from '../components/AuthorizationForm/AuthorizationForm.dictionary';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import authenticateUser from '../../../api/authenticateUser';

const {
    MIN_CREDS_LENGTH,
    MAX_LOGIN_LENGTH,
    MAX_PASSWORD_LENGTH,
    TOO_SHORT_LOGIN_MESSAGE,
    TOO_LONG_LOGIN_MESSAGE,
    TOO_SHORT_PASSWORD_MESSAGE,
    TOO_LONG_PASSWORD_MESSAGE,
} = AUTHORIZATION_FORM_DICTIONARY;

const authorizationCredentials = z.object({
    login: z.string().min(MIN_CREDS_LENGTH, TOO_SHORT_LOGIN_MESSAGE).max(MAX_LOGIN_LENGTH, TOO_LONG_LOGIN_MESSAGE),
    password: z.string().min(MIN_CREDS_LENGTH, TOO_SHORT_PASSWORD_MESSAGE).max(MAX_PASSWORD_LENGTH, TOO_LONG_PASSWORD_MESSAGE),
});


const useAuthorizationForm = () => {
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);

    const { register, setError, formState: { errors, isValid }, handleSubmit } = useForm({
        mode: 'onBlur',
        resolver: zodResolver(authorizationCredentials),
    });

    const onAuthenticateUser = async (credentials) => {
        try {
            const token = await authenticateUser(credentials);
            localStorage.setItem('Authorization', `Bearer ${token}`);
        } catch (e) {
            // TODO handle error with alert notifications
            console.log(e);
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