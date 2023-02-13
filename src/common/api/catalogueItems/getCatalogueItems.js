import testBgImage from '../../assets/images/ZeroBlock/ZeroBlockSM.png';

const getCatalogueItems = async (queryString) => {
    return await new Promise((resolve) => {
        setTimeout(() => {
            console.log(queryString);
            // переведёт промис в состояние fulfilled с результатом "result"
            resolve([
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
        }, 1000);
    });
};

export default getCatalogueItems;