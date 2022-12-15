import React from 'react';
import { screen, render } from '@testing-library/react';
import TosterError from './TosterError';
import TosterNotification from './TosterNotification';
import TosterSuccess from './TosterSuccess';

jest.mock('./TosterError', () => ({
    __esModule: true,
    default: () => <div data-testid='toster-error'/>
}));

jest.mock('./TosterNotification', () => ({
    __esModule: true,
    default: () => <div data-testid='toster-notification'/>
}));

jest.mock('./TosterSuccess', () => ({
    __esModule: true,
    default: () => <div data-testid='toster-success'/>
}));

describe('Toster', () => {

    const props = {
        text: '',
        device: {},
        onClose: jest.fn(),
    };

    it('should render toster error',  () => {
        render(<TosterError text={props.text} device={props.device} onClose={props.onClose}/>);
        const errorPanel = screen.getByTestId('toster-error');
        expect(errorPanel).toBeInTheDocument();
    });

    it('should render toster notification', () => {
        render(<TosterNotification text={props.text} device={props.device} onClose={props.onClose}/>);
        const notificationPanel = screen.getByTestId('toster-notification');
        expect(notificationPanel).toBeInTheDocument();
    });

    it('should render toster success', () => {
        render(<TosterSuccess text={props.text} device={props.device} onClose={props.onClose}/>);
        const successPanel = screen.getByTestId('toster-success');
        expect(successPanel).toBeInTheDocument();
    });
});



