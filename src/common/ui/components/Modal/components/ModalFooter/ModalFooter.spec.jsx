import { render, screen } from '@testing-library/react';
import ModalFooter from './ModalFooter';
import { ButtonAccent } from '../../../Buttons';

describe('ModalFooter', () => {
    it('should render', () => {
        render(<ModalFooter actionButtons={[
            <ButtonAccent text={'Отмена'} key={0}/>,
            <ButtonAccent text={'Сохранить'} key={1}/>,

        ]}/>);

        expect(screen.getByText('Отмена')).toBeInTheDocument();
        expect(screen.getByText('Сохранить')).toBeInTheDocument();

    });
});
