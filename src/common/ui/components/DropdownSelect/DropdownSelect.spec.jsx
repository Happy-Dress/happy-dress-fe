import { render, screen } from '@testing-library/react';
import { DropdownSelect } from './DropdownSelect';
import { DROPDOWN_DICTIONARY } from './DropdownSelect.dictionary';
import userEvent from '@testing-library/user-event';
import styles from './DropdownSelect.module.scss';

const { SELECTED } = DROPDOWN_DICTIONARY;

const options = [
    { id: 1, value: 'option1' },
    { id: 2, value: 'option2' },
    { id: 3, value: 'option3' },
    { id: 4, value: 'option4' },
];

const renderNotMultipleDDSelect= () => render(
    <DropdownSelect
        name={'name'}
        placeholder={'placeholder'}
        options={options}
        onChange={() => {}}
        multiple={false}
        error={true}
    />
);
describe('DropdownSelect', () => {
    it('should render placeholder value and all options', () => {
        renderNotMultipleDDSelect();

        expect(screen.getByText('placeholder')).toBeInTheDocument();
        expect(screen.getByDisplayValue('option1')).toBeInTheDocument();
        expect(screen.getByDisplayValue('option2')).toBeInTheDocument();
        expect(screen.getByDisplayValue('option3')).toBeInTheDocument();
        expect(screen.getByDisplayValue('option4')).toBeInTheDocument();
    });

    it('should render option1 name', () => {
        render(
            <DropdownSelect
                name={'name'}
                placeholder={'placeholder'}
                options={options}
                defaultValues={['1']}
                multiple={false}
                error={false}
            />
        );

        expect(screen.getAllByDisplayValue('option1')).toHaveLength(1);
        expect(screen.getByDisplayValue('option2')).toBeInTheDocument();
        expect(screen.getByDisplayValue('option3')).toBeInTheDocument();
        expect(screen.getByDisplayValue('option4')).toBeInTheDocument();
    });

    it('should render number of selected options', () => {
        render(
            <DropdownSelect
                name={'name'}
                placeholder={'placeholder'}
                options={options}
                defaultValues={['1', '2']}
                multiple={false}
                error={false}
            />
        );

        expect(screen.getByDisplayValue('option1')).toBeInTheDocument();
        expect(screen.getByDisplayValue('option2')).toBeInTheDocument();
        expect(screen.getByDisplayValue('option3')).toBeInTheDocument();
        expect(screen.getByDisplayValue('option4')).toBeInTheDocument();
        expect(screen.getByText(`2 ${SELECTED}`)).toBeInTheDocument();
    });

    it('should render not checked radio options', () => {
        renderNotMultipleDDSelect();

        expect(screen.getByDisplayValue('option1')).not.toBeChecked();
        expect(screen.getByDisplayValue('option2')).not.toBeChecked();
        expect(screen.getByDisplayValue('option3')).not.toBeChecked();
        expect(screen.getByDisplayValue('option4')).not.toBeChecked();
    });


    it('should render with open select options', () => {
        renderNotMultipleDDSelect();

        const select = screen.getByTestId('selectPlaceholder');
        const arrowDown = screen.getByTestId('arrowDown');
        userEvent.click(select);
        expect(arrowDown).toHaveClass(styles.active);
    });

    it('should render error class', () => {
        renderNotMultipleDDSelect();

        const select = screen.getByTestId('selectPlaceholder');
        expect(select).toHaveClass(styles.csError);
        userEvent.click(select);
    });

    it('should close select on outside click', () => {
        render(
            <div data-testid={'outer'}>
                <DropdownSelect
                    name={'name'}
                    placeholder={'placeholder'}
                    options={options}
                    multiple={false}
                    error={true}
                />
            </div>
        );

        const outer = screen.getByTestId('outer');
        const select = screen.getByTestId('selectPlaceholder');
        const arrowDown = screen.getByTestId('arrowDown');

        expect(arrowDown).not.toHaveClass(styles.active);
        userEvent.click(select);
        expect(arrowDown).toHaveClass(styles.active);
        userEvent.click(outer);
        expect(select).not.toHaveClass(styles.active);
    });

    it('should select radio options on click', () => {
        render(
            <DropdownSelect
                name={'name'}
                placeholder={'placeholder'}
                options={options}
                onChange={() => {}}
                multiple={false}
                error={true}
            />
        );

        const select = screen.getByTestId('selectPlaceholder');
        const arrowDown = screen.getByTestId('arrowDown');
        const option1 = screen.getByDisplayValue('option1');

        expect(option1).not.toBeChecked();
        expect(arrowDown).not.toHaveClass(styles.active);
        userEvent.click(select);
        userEvent.click(option1);
        expect(option1).toBeChecked();

    });

    it('should have checked checkbox options on click and uncheck on the next click', () => {
        render(
            <DropdownSelect
                name={'name'}
                placeholder={'placeholder'}
                options={options}
                onChange={() => {}}
                multiple={true}
                error={true}
            />
        );

        const select = screen.getByTestId('selectPlaceholder');
        const arrowDown = screen.getByTestId('arrowDown');
        const option1 = screen.getByDisplayValue('option1');

        expect(option1).not.toBeChecked();
        expect(arrowDown).not.toHaveClass(styles.active);
        userEvent.click(select);
        userEvent.click(option1);
        expect(option1).toBeChecked();
        userEvent.click(option1);
        expect(option1).not.toBeChecked();
    });
});
