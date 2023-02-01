import getCatalogueItems from './getCatalogueItems';
import testBgImage from '../../assets/images/ZeroBlock/ZeroBlockSM.png';

describe('getCatalogueItems',  () => {
    it('should return expected values', async () => {

        const response = await getCatalogueItems('categories=4');
        expect(response).toEqual([
            {
                id: 1,
                name: 'S000012345',
                colors: [
                    '#fff',
                    '#000',
                    '#a65f30'
                ],
                sizes: [1, 2, 3, 4],
                category: 'Свадебные',
                imageUrl: testBgImage
            },
            {
                id: 2,
                name: 'S000012346',
                colors: [
                    '#fff',
                    '#000',
                    '#a65f30'
                ],
                sizes: [1, 2, 3, 4],
                category: 'Деловой стиль',
                imageUrl: testBgImage
            },
        ]);
    });
});