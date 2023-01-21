import { render, screen, waitFor } from '@testing-library/react';

import React from 'react';
import SettingsDropDown from './SettingDropDown';
import userEvent from '@testing-library/user-event';

describe('SettingDropDown', () => {
    it('should render correctly', async () => {
        const name = 'Sample';
        const children = <div/>;
        render(<SettingsDropDown name={name}>{children}</SettingsDropDown>);
        const page = screen.getByText('Sample');
        expect(page).toBeInTheDocument();
    });

    it('should press elem correctly', async () => {
        const title = 'Sample';
        const mockText = 'Text';
        const child = <p>{mockText}</p>;
        render(<SettingsDropDown name={title}>{child}</SettingsDropDown>);
        const titleElem = screen.getByText('Sample');
        userEvent.click(titleElem);
        const childElem = screen.getByText(mockText);
        waitFor(() => {
            expect(childElem).toBeInTheDocument(); 
        });
    });
});