import ColorCircle from './index';
import { render, screen } from '@testing-library/react';

describe('ColorCircle', () => {
    it('should render with current color and label', () => {
        const firstColor = '#ffffff';
        const secondColor = '#000000';
        const backgroundStyle = `linear-gradient( -45deg, ${firstColor}, ${firstColor} 49%, white 49%, white 51%, ${secondColor} 51% )`;
        const label = 'test';

        render(<ColorCircle firstColor={firstColor} secondColor={secondColor} label={label} />);

        const circle = screen.getByTestId('color-circle');
        expect(circle).toHaveStyle(`background: ${backgroundStyle}`);

        const labelElement = screen.getByText(label);
        expect(labelElement).toBeInTheDocument();
    }); 
});