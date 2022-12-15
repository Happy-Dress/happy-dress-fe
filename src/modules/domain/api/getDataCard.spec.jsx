import getDataCards from './getDataCards';

function fetchDataPromiseWithErrorMessage() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            reject('error');
        }, 100);
    });
}
describe('getDataCards',  () => {
    it('the fetch fails with an error', async () => {
        expect.assertions(1);
        try {
            await fetchDataPromiseWithErrorMessage();
        } catch (e) {
            expect(e).toMatch('error');
        }
    });
});

