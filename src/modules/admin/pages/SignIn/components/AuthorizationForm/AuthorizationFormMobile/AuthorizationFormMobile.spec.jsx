import React from 'react';
import { screen, render, waitFor, act, fireEvent } from '@testing-library/react';
import useAuthorizationForm from '../../../hooks/useAuthorizationForm';
import AuthorizationFormMobile from './AuthorizationFormMobile';
import userEvent from '@testing-library/user-event';

const Wrapper = () => {

    const authorizationForm = useAuthorizationForm();

    return (
        <>
            <AuthorizationFormMobile {...authorizationForm}/>
        </>
    );
};

const mockedUseNavigate = jest.fn();
jest.mock('react-routerConfig-dom', () => ({
    useNavigate: () => mockedUseNavigate,
}));

jest.mock('../../../../../api/authenticateUser', () => (
    jest.fn()
));


describe('AuthorizationFormMobile', () => {

    beforeEach(() => {
        render(<Wrapper/>);
    });

    it('should render authorization form mobile', async () => {
        const mobilePanel = screen.getByText('ВХОД');
        await waitFor(() => {
            expect(mobilePanel).toBeInTheDocument();
        });
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