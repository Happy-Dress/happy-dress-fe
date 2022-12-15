import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import TosterNotification from './index';

const props = {
    text: 'sample',
    device: {
        isDesktop: true,
        isMobile: false,
    },
    onClose: jest.fn(),
};

describe('TosterNotification', () => {

    beforeEach(() => {
        render(<TosterNotification text={props.text} device={props.device} onClose={props.onClose}/>);
    });

    it('should render toster notification', () => {
        const notificationPanel = screen.getByText('sample');
        expect(notificationPanel).toBeInTheDocument();
    });

    it('should click on close button', () => {
        userEvent.click(screen.getByAltText('close icon'));
        expect(props.onClose).toBeCalledTimes(1);
    });
});