import React from 'react';
import { screen, render, act, fireEvent } from '@testing-library/react';
import AuthorizationFormDesktop from './AuthorizationFormDesktop';
import userEvent from '@testing-library/user-event';
import useAuthorizationForm from '../../../hooks/useAuthorizationForm';

const Wrapper = () => {

    const authorizationForm = useAuthorizationForm();

    return (
        <>
            <AuthorizationFormDesktop {...authorizationForm}/>
        </>
    );
};

const mockedUseNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
    useNavigate: () => mockedUseNavigate,
}));

jest.mock('../../../../../api/authenticateUser', () => (
    jest.fn()
));

describe('AuthorizationFormDesktop', () => {

    beforeEach(() => {
        render(<Wrapper/>);
    });

    it('should render authorization form desktop', async () => {
        const panelDesktop = screen.getByText('ВХОД');
        expect(panelDesktop).toBeInTheDocument();
    });

    it('should press enter button', async () => {
        await act(() => {
            userEvent.paste(screen.getByPlaceholderText('Ваше Имя'), 'admin');
        });
        await act(() => {
            userEvent.paste(screen.getByPlaceholderText('Пароль'), 'admin');
        });
        await act(() => {
            userEvent.click(screen.getByText('Войти'));
        });
        expect(mockedUseNavigate).toHaveBeenCalledTimes(1);
    });

    it('should change password visibility', async () => {
        const PicVisibility = screen.getByAltText('visibility icon');
        await act(() => {
            userEvent.click(PicVisibility);
        });
        const PasswordInput = screen.getByPlaceholderText('Пароль');
        expect(PasswordInput.type).toBe('text');
    });

    it('should render error login message', async () => {
        await act(() => {
            fireEvent.blur(screen.getByPlaceholderText('Ваше Имя'));
        });
        expect(screen.getByText('Слишком короткое имя')).toBeInTheDocument();
    });

    it('should render error password message', async () => {
        await act(() => {
            fireEvent.blur(screen.getByPlaceholderText('Пароль'));
        });
        expect(screen.getByText('Слишком короткий пароль')).toBeInTheDocument();
    });
});