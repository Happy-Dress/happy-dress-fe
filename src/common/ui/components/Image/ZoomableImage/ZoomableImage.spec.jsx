import { render } from '@testing-library/react';
import ZoomableImage from './index';
import userEvent from '@testing-library/user-event';

describe('ZoomableImage', () => {
    it('should render', () => {
        const { baseElement } = render(<ZoomableImage><div/></ZoomableImage>);
        expect(baseElement).toBeInTheDocument();

        userEvent.click(baseElement.firstElementChild.firstElementChild);
        const svgElem = baseElement.querySelector('svg');
        expect(svgElem).toBeInTheDocument();
    });
});