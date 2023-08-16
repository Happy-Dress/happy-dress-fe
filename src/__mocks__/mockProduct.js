import { mockCatalogueItemResponse } from './mockCatalogueItemResponse';

export default {
    product: mockCatalogueItemResponse,
    uniqueColors: Array.from(
        new Map(
            mockCatalogueItemResponse.productColorSizes
                .map((colorSize) => colorSize.color)
                .map((obj) => [obj.id, obj])
        ).values()),
    currentColorSize: mockCatalogueItemResponse.productColorSizes[0],
    mainImageUrl: mockCatalogueItemResponse.mainImageUrl,
    selectedImage: {
        imageUrl: mockCatalogueItemResponse.mainImageUrl,
        index: 0,
    },
};

