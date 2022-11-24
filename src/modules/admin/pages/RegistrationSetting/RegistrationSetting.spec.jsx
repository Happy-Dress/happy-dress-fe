import React from 'react';
import { render, screen } from '@testing-library/react';
import RegistrationSetting from './index';

describe('RegistrationSetting', () => {
    it('should render correctly', async () => {
        render(<RegistrationSetting />);
        const page = screen.getByTestId('registration-page');
        expect(page).toBeInTheDocument();
    });
});