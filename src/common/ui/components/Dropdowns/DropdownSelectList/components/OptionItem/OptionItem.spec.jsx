import { act, render, screen } from '@testing-library/react';
import OptionItem from './OptionItem';
import userEvent from '@testing-library/user-event';

const props = {
    isChecked: false,
    changeFilter: () => {},
    item: {
        id: 1,
        name: 'Опция 1'
    },
    currentCategory: 'models',
    isSingleOptionOnly: false
};

describe('Option Item', () => {
    it('should render correctly', () => {
        const { container } = render(<OptionItem {...props}/>);
        expect(container.getElementsByClassName('empty').length).toBe(1);
    });

    it('should render correctly', () => {
        props.isChecked = true;
        const { container } = render(<OptionItem {...props}/>);
        expect(container.getElementsByClassName('checkbox').length).toBe(1);
    });

    it('should change isOpen', async () => {
        props.isChecked = false;
        const { container } = render(<OptionItem {...props}/>);

        expect(container.getElementsByClassName('empty').length).toBe(1);

        await act(() => {
            userEvent.click(container.getElementsByTagName('label')[0]);
        });

        expect(container.getElementsByClassName('checkbox').length).toBe(1);
    });

    it('should change isOpen with single Option', async () => {
        props.isChecked = false;
        props.isSingleOptionOnly  = true;
        const { container } = render(<OptionItem {...props}/>);

        expect(container.getElementsByClassName('empty').length).toBe(1);

        await act(() => {
            userEvent.click(container.getElementsByTagName('label')[0]);
        });

        expect(container.getElementsByClassName('checkbox').length).toBe(1);
    });

    it('should change isOpen', async () => {
        props.isChecked = true;
        props.isSingleOptionOnly  = false;
        const { container } = render(<OptionItem {...props}/>);

        expect(container.getElementsByClassName('checkbox').length).toBe(1);

        await act(() => {
            userEvent.click(container.getElementsByTagName('label')[0]);
        });

        expect(container.getElementsByClassName('empty').length).toBe(1);
    });
});
