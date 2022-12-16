import React from 'react';
import { screen, render } from '@testing-library/react';
import ToasterError from './ToasterError';
import ToasterNotification from './ToasterNotification';
import ToasterSuccess from './ToasterSuccess';

jest.mock('./ToasterError', () => ({
    __esModule: true,
    default: () => <div data-testid='toster-error'/>
}));

jest.mock('./ToasterNotification', () => ({
    __esModule: true,
    default: () => <div data-testid='toster-notification'/>
}));

jest.mock('./ToasterSuccess', () => ({
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
        render(<ToasterError text={props.text} device={props.device} onClose={props.onClose}/>);
        const errorPanel = screen.getByTestId('toster-error');
        expect(errorPanel).toBeInTheDocument();
    });

    it('should render toster notification', () => {
        render(<ToasterNotification text={props.text} device={props.device} onClose={props.onClose}/>);
        const notificationPanel = screen.getByTestId('toster-notification');
        expect(notificationPanel).toBeInTheDocument();
    });

    it('should render toster success', () => {
        render(<ToasterSuccess text={props.text} device={props.device} onClose={props.onClose}/>);
        const successPanel = screen.getByTestId('toster-success');
        expect(successPanel).toBeInTheDocument();
    });
});



