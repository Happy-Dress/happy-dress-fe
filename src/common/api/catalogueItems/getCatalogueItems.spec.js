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
                sizes: [40, 42, 44, 46, 48, 50, 52],
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
                sizes: [40, 44, 48, 50],
                category: 'Деловой стиль',
                imageUrl: testBgImage
            },
            {
                id: 3,
                name: 'S000012347',
                colors: [
                    '#fff',
                    '#a65f30'
                ],
                sizes: [40, 44, 48, 50],
                category: 'Деловой стиль',
                imageUrl: testBgImage
            },
            {
                id: 4,
                name: 'S000012348',
                colors: [
                    '#fff',
                    '#a65f30'
                ],
                sizes: [40, 44, 48, 50],
                category: 'Деловой стиль',
                imageUrl: testBgImage
            },
        ]);
    });
});