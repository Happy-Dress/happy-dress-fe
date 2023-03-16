import { render, screen } from '@testing-library/react';
import ProgressBar from './ProgressBar';

describe('ProgressBar', () => {
    it('should render', () => {
        render(ProgressBar({ completed: 0 }));

        expect(screen.getByTestId('progress-bg')).toBeInTheDocument();
        expect(screen.getByTestId('progress')).toBeInTheDocument();
    });
});