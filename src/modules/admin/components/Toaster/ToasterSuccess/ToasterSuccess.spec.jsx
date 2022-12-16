import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ToasterSuccess from './index';

const props = {
    text: 'sample',
    device: {
        isDesktop: true,
        isMobile: false,
    },
    onClose: jest.fn(),
};

describe('ToasterSuccess', () => {

    beforeEach(() => {
        render(<ToasterSuccess text={props.text} device={props.device} onClose={props.onClose}/>);
    });

    it('should render toster success', () => {
        const errorPanel = screen.getByText('sample');
        expect(errorPanel).toBeInTheDocument();
    });

    it('should click on close button', () => {
        userEvent.click(screen.getByAltText('close icon'));
        expect(props.onClose).toBeCalledTimes(1);
    });
});