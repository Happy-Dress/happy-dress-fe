import axios from 'axios';
import authenticateUser from './authenticateUser';


describe('authenticateUser', () => {
    it('should return access token', async () => {
        axios.post = jest.fn().mockImplementationOnce(() => 
            Promise.resolve({
                data: {
                    accessToken: 'access',
                }
            })
        );
        const testUser = {
            login: 'user',
            password: '1234',
        };
        let expectedToken = 'access';
        let currentToken = await authenticateUser(testUser);
        expect(currentToken).toBe(expectedToken);
    });
});