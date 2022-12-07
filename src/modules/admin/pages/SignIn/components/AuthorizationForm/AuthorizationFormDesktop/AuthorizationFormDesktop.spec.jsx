import React from 'react';
import { screen, render, waitFor, } from '@testing-library/react';
import AuthorizationFormDesktop from './AuthorizationFormDesktop';
import userEvent from '@testing-library/user-event';

const props = {
    onSubmit: jest.fn(),
    errors: {},
    register: jest.fn(),
    isValid: false,
    isPasswordVisible: false,
    togglePasswordVisibility: jest.fn(),
};

describe('AuthorizationFormDesktop', () => {
    it('should render authorization form desktop', async () => {
        const { baseElement } = render(<AuthorizationFormDesktop {...props}/>);
        expect(baseElement).toBeInTheDocument();
    });

    it('should press enter button', async () => {
        render(<AuthorizationFormDesktop {...props}/>);
        const BtnEnter = screen.getByText('Войти');
        const InputName = screen.getByPlaceholderText('Ваше Имя');
        const InputPassword = screen.getByPlaceholderText('Пароль');
        await waitFor(() => {userEvent.paste(InputName, 'admin');});
        await waitFor(() => { userEvent.paste(InputPassword, 'admin'); } );
        await waitFor(() => {
            userEvent.click(BtnEnter);
        });
        expect(props.onSubmit).toHaveBeenCalledTimes(1);
    });

    it('should change password visibility', async () => {
        render(<AuthorizationFormDesktop {...props}/>);
        const PicVisibility = screen.getByAltText('visibility icon');
        userEvent.click(PicVisibility);
        expect(props.togglePasswordVisibility).toHaveBeenCalledTimes(1);
    });
});