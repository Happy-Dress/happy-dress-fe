import ModalDesktop from './ModalDesktop';
import { render } from '@testing-library/react';

describe('Modal Desktop', () =>{
    it('should render correctly', async () =>{
        const { baseElement } = render(<ModalDesktop size='lg'/>);
        expect(baseElement).toBeInTheDocument();
    });
});
