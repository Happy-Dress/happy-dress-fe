import React from 'react';
import { render } from '@testing-library/react';
import RegistrationSetting from './index';

describe('RegistrationSetting', () => {
    it('should render correctly', async () => {
        const { baseElement } = render(<RegistrationSetting />);
        expect(baseElement).toBeInTheDocument();
    });
});
