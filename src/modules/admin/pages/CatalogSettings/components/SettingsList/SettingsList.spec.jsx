import { render, screen } from '@testing-library/react';
import SettingsList from './SettingsList';

const props = {
    settings: [
        {
            'id': 394,
            'name': 'Длинные',
            orderNumber: 0,
        },
        {
            'id': 224,
            'name': 'Короткие',
            orderNumber: 1,
        }
    ],
    handleReorder: jest.fn(),
    onEdit: jest.fn(),
    onRemove: jest.fn(),
    onSelect: jest.fn(),
    onUnSelect: jest.fn()
};

describe('SettingsList', () => {
    it('should render', () => {
        const { container } = render(<SettingsList {...props}/>);

        expect(container.getElementsByClassName('SettingsList')[0]).toBeInTheDocument();
        expect(container.getElementsByClassName('listArea')[0]).toBeInTheDocument();
        expect(screen.getByText(props.settings[0].name)).toBeInTheDocument();

        screen.debug();
    });
});
