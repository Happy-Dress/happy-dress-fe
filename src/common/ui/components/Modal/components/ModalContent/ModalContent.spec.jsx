import { render, screen } from '@testing-library/react';
import ModalContent from './ModalContent';

describe('ModalContent', () => {
    it('should render', () => {
        render(<ModalContent ><div>Контент</div></ModalContent>);

        expect(screen.getByText('Контент')).toBeInTheDocument();
    });
});
