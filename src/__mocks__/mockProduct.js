import { mockCatalogueItemResponse } from './mockCatalogueItemResponse';

export default {
    product: mockCatalogueItemResponse,
    uniqueColors: Array.from(new Set(mockCatalogueItemResponse.productColorSizes.map(item => item.color.name))),
    currentColorSize: mockCatalogueItemResponse.productColorSizes[0],
    mainImageUrl: mockCatalogueItemResponse.mainImageUrl,
    selectedImage: {
        imageUrl: mockCatalogueItemResponse.mainImageUrl,
        index: 0,
    },
};

