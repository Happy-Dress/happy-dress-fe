import React from 'react';
import { vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import RegistrationSetting from './index';

vi.mock('./RegistrationSetting', ()=>({
    __esModule: true,
    default: () =>{
        return <div data-testid="registration-page"/>;
    }
}));
describe('RegistrationSetting', () => {
    it('should render correctly', async () => {
        render(<RegistrationSetting />);
        const page = screen.getByTestId('registration-page');
        expect(page).toBeInTheDocument();
    });
});
