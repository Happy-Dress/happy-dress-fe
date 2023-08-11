import { render, screen } from '@testing-library/react';
import ModalHeader from './ModalHeader';

describe('ModalContent', () => {
    it('should render', () => {
        render(<ModalHeader onClose={jest.fn()} title={'Название'}><div>Контент</div></ModalHeader>);

        expect(screen.getByText('Название')).toBeInTheDocument();
    });
});
