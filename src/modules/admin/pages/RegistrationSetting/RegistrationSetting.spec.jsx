/* eslint-disable indent */
import React from 'react';
import { render, screen } from '@testing-library/react';
import RegistrationSetting from './index';

jest.mock('./RegistrationSetting', ()=>({
__esModule: true,
default: () =>{
return <div  data-testid="registration-page"></div>;
}
}));
describe('RegistrationSetting', () => {
it('should render correctly', async () => {
render(<RegistrationSetting />);
const page = screen.getByTestId('registration-page');
expect(page).toBeInTheDocument();
});
});