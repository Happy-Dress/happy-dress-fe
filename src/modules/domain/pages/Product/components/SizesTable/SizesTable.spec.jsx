import { render, screen } from '@testing-library/react';
import SizesTable from './index';

const TABLE_SIZE_HEAD = ['Росcийский размер', 'Обхват груди', 'Обхват талии', 'Обхват бедер'];
const TABLE_SIZE_BODY = [['38', '69-71', '55-58', '83-86']];

describe('SizesTable', () => {
    it('should render correctly', () => {
        const { baseElement } = render(<SizesTable tableSizeHead={TABLE_SIZE_HEAD} tableSizeBody={TABLE_SIZE_BODY}/>);
        expect(baseElement).toBeInTheDocument();
    });

    it('should render table head correctly', () => {
        render(<SizesTable tableSizeHead={TABLE_SIZE_HEAD} tableSizeBody={TABLE_SIZE_BODY}/>);
        const tableHead = screen.getByText(TABLE_SIZE_HEAD[0]);
        expect(tableHead).toBeInTheDocument();
    });

    it('shoulder render table body correctly', () => {
        render(<SizesTable tableSizeHead={TABLE_SIZE_HEAD} tableSizeBody={TABLE_SIZE_BODY}/>);
        const tableBody = screen.getByText(TABLE_SIZE_BODY[0][0]);
        expect(tableBody).toBeInTheDocument();
    });
});