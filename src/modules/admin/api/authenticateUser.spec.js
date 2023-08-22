import axios from 'axios';
import authenticateUser from './authenticateUser';


describe('authenticateUser', () => {
    it('should return access token', async () => {
        axios.post = jest.fn().mockImplementationOnce(() => 
            Promise.resolve({
                data: {
                    accessToken: 'access',
                    refreshToken: 'refresh',
                }
            })
        );
        const testUser = {
            login: 'user',
            password: '1234',
        };
        let expectedToken = {
            accessToken: 'access',
            refreshToken: 'refresh',
        };
        let currentToken = await authenticateUser(testUser);
        expect(currentToken).toStrictEqual(expectedToken);
    });
});