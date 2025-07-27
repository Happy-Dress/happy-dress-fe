import { vi } from 'vitest';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import useAuthorizationForm from './useAuthorizationForm';
import { useToasters } from '../../../../../common/ui/contexts/ToastersContext';

vi.mock('react', () => ({
    useState: vi.fn(),
}));

vi.mock('react-hook-form', () => ({
    useForm: vi.fn(),
}));

vi.mock('react-router-dom', () => ({
    useNavigate: vi.fn(),
}));

vi.mock('../../../../../common/ui/contexts/ToastersContext', () => ({
    useToasters: vi.fn(),
}));


describe('useAuthorizationForm', () => {
    it('should return functions and variables', () => {
        useState.mockImplementation(() => [false, vi.fn()]);
        useForm.mockImplementation(() => {
            return {
                register: {},
                setError: vi.fn(),
                formState: { errors: {}, isValid: false },
                handleSubmit: () => vi.fn(),
            };
        });
        useNavigate.mockImplementation(vi.fn());
        useToasters.mockImplementation(() => {
            return {
                showTosterError: vi.fn(),
                showToasterNotification: vi.fn(),
                showToasterSuccess: vi.fn(),
            };
        });

        const onSubmit = vi.fn();
        const register = {};
        const setError = vi.fn();
        const errors = {};
        const isValid = false;
        const isPasswordVisible = false;
        const togglePasswordVisibility = () => vi.fn();

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