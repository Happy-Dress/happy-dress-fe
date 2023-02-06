import { render, screen, waitFor } from '@testing-library/react';
import SettingListItem from './SettingListItem';
import userEvent from '@testing-library/user-event';

const mockSetting = {
    id: 1,
    name: 'Пышные'
};
const mockOnSelect = jest.fn();
const mockOnUnselect = jest.fn();

describe('SettingListItem', () => {

    it('should render correctly', () => {
        const { baseElement } = render(<SettingListItem setting={mockSetting}/>);
        expect(baseElement).toBeInTheDocument();
    });

    it('should handle select and unselect', async () => {
        render(<SettingListItem setting={mockSetting} onSelect={mockOnSelect} onUnSelect={mockOnUnselect}/>);
        const checkbox = screen.getByRole('checkbox');
        await waitFor(() =>{
            userEvent.click(checkbox);
        });
        await waitFor(() =>{
            userEvent.click(checkbox);
        });
        expect(mockOnSelect).toHaveBeenCalled();
        expect(mockOnUnselect).toHaveBeenCalled();
    });
});
