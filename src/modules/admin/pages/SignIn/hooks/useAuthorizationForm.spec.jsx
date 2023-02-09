import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import useAuthorizationForm from './useAuthorizationForm';
import { useToasters } from '../../../../../common/ui/contexts/ToastersContext';

jest.mock('react', () => ({
    useState: jest.fn(),
}));

jest.mock('react-hook-form', () => ({
    useForm: jest.fn(),
}));

jest.mock('react-routerConfig-dom', () => ({
    useNavigate: jest.fn(),
}));

jest.mock('../../../../../common/ui/contexts/ToastersContext', () => ({
    useToasters: jest.fn(),
}));


describe('useAuthorizationForm', () => {
    it('should return functions and variables', () => {
        useState.mockImplementation(() => [false, jest.fn()]);
        useForm.mockImplementation(() => {
            return {
                register: {},
                setError: jest.fn(),
                formState: { errors: {}, isValid: false },
                handleSubmit: () => jest.fn(),
            };
        });
        useNavigate.mockImplementation(jest.fn());
        useToasters.mockImplementation(() => {
            return {
                showTosterError: jest.fn(),
                showToasterNotification: jest.fn(),
                showToasterSuccess: jest.fn(),
            };
        });

        const onSubmit = jest.fn();
        const register = {};
        const setError = jest.fn();
        const errors = {};
        const isValid = false;
        const isPasswordVisible = false;
        const togglePasswordVisibility = () => jest.fn();

        const actualResult = useAuthorizationForm();
        expect(JSON.stringify({
            onSubmit,
            register,
            setError,
            errors,
            isValid,
            isPasswordVisible,
            togglePasswordVisibility,
        })).toStrictEqual(JSON.stringify(actualResult));
    });
});