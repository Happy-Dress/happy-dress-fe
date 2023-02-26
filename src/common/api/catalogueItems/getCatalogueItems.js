import testBgImage from '../../assets/images/ZeroBlock/ZeroBlockSM.png';

const item = {
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
};

const getCatalogueItems = async (filters) => {
    return await new Promise((resolve) => {
        console.log(filters);
        const arr = [];
        for(let i = 0; i< 15; i++){
            arr.push(item);
        }
        resolve(arr);
    });
};

export default getCatalogueItems;
