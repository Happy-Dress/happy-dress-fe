import { render, screen } from '@testing-library/react';

import React from 'react';
import SettingsDropDown from './SettingDropDown';

describe('SettingDropDown', () => {
    it('should render correctly', async () => {
        const name = 'Sample';
        const children = <div/>;
        render(<SettingsDropDown name={name}>{children}</SettingsDropDown>);
        const page = screen.getByText('Sample');
        expect(page).toBeInTheDocument();
    });
});