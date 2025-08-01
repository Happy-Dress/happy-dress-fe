import styles from './Switcher.module.scss';
import { vi } from 'vitest';
import { act, render } from '@testing-library/react';
import Switcher from './Switcher';
import userEvent from '@testing-library/user-event';
const setIsActive = vi.fn();

describe('Switcher', () => {
    it('should render', () => {
        const { container } = render(<Switcher switcherState={[false, setIsActive]}/>);

        expect(container.getElementsByClassName(styles.Switcher)[0]).toBeInTheDocument();
        expect(container.getElementsByTagName('input')[0].checked).toBe(false);

    });
    it('should change state', async () => {
        const { container } = render(<Switcher switcherState={[false, setIsActive]}/>);

        await act(() => {
            userEvent.click(container.getElementsByClassName(styles.Switcher)[0]);
        });

        expect(setIsActive).toBeCalled();
    });

    it('should get right left value', async () => {
        const { container } = render(<Switcher switcherState={[true, setIsActive]}/>);

        expect(container.getElementsByClassName(styles.indicator)[0]).toHaveStyle('left: calc(100% - 0px - 4px)');
    });
});
