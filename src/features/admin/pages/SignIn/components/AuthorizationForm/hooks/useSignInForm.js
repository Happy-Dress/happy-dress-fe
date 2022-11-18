import * as z from 'zod';
import { AUTHORIZATION_FORM_DICTIONARY } from '../AuthorizationFormDesktop/AuthorizationFormDesktop.dictionary';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

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

const useSignInForm = () => {
    const { register, setError, formState: { errors, isValid }, handleSubmit } = useForm({
        mode: 'onBlur',
        resolver: zodResolver(authorizationCredentials)
    });

    return {
        register,
        setError,
        errors,
        isValid,
        handleSubmit,
    };
};

export default useSignInForm;