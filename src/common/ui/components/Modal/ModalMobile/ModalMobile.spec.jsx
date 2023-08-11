import { render } from '@testing-library/react';
import ModalMobile from './ModalMobile';

describe('Modal Mobile', () =>{
    it('should render correctly', async () =>{
        const { baseElement } = render(<ModalMobile size='lg'/>);
        expect(baseElement).toBeInTheDocument();
    });
    it('should render correctly', async () =>{
        const { baseElement } = render(<ModalMobile size={''}/>);
        expect(baseElement).toBeInTheDocument();
    });
});
