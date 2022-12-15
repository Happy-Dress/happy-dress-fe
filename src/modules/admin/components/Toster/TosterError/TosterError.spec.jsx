import { render, screen } from '@testing-library/react';
import TosterError from './index';
import userEvent from '@testing-library/user-event';

const props = {
    text: 'sample',
    device: {
        isDesktop: true,
        isMobile: false,
    },
    onClose: jest.fn(),
};

describe('TosterError', () => {

    beforeEach(() => {
        render(<TosterError text={props.text} device={props.device} onClose={props.onClose}/>);
    });

    it('should render toster error', () => {
        const errorPanel = screen.getByText('sample');
        expect(errorPanel).toBeInTheDocument();
    });

    it('should click on close button', () => {
        userEvent.click(screen.getByAltText('close icon'));
        expect(props.onClose).toBeCalledTimes(1);
    });
});