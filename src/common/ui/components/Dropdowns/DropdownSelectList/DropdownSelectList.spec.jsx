import { act, render, screen } from '@testing-library/react';
import DropdownSelectList from './DropdownSelectList';
import userEvent from '@testing-library/user-event';

const props = {
    options: [
        {
            id: 1,
            name: 'Опция 1'
        },
        {
            id: 2,
            name: 'Опция 2'
        }
    ],
    changeFilter: () => {},
    currentCategory: 'models',
    selectedItems: '1'
};

describe('DropdownSelectList', () => {
    it('should render correctly', () => {
        const { container } = render(<DropdownSelectList {...props}/>);
        expect(container.getElementsByClassName('title').length).toBe(1);
        expect(container.getElementsByClassName('OptionItem').length).toBe(2);
        screen.debug();
    });
    it('should open options list', async () => {
        const { container } = render(<DropdownSelectList {...props}/>);

        expect(container.getElementsByClassName('options')[0]).toHaveStyle('height: 0');

        await act(() => {
            userEvent.click(container.getElementsByClassName('currentFilter')[0]);
        });

        expect(container.getElementsByClassName('options')[0]).toHaveStyle('height: calc(60px * 2)');
    });
});
