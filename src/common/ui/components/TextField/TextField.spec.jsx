import styles from './TextField.module.scss';
import { render, screen } from '@testing-library/react';
import { TextField } from './TextField';

describe('TextField', () => {
    it('should render', () => {
        render(
            <TextField
                placeholder={'test'}
            />
        );
        const input = screen.getByPlaceholderText('test');

        expect(input).toBeInTheDocument();
        expect(input).not.toHaveClass('error');

    });

    it('should render error input', () => {
        render(
            <TextField
                placeholder={'test'}
                error={true}
            />
        );

        const input = screen.getByPlaceholderText('test');

        expect(input).toHaveClass(styles.error);
    });
});
