import { formatFiltersName } from './formatFiltersName';

describe('formatFiltersName', () => {
    it('should return correct answers', () => {
        expect(formatFiltersName('models')).toBe('Модель');
        expect(formatFiltersName('categories')).toBe('Категории');
        expect(formatFiltersName('colors')).toBe('Цвет');
        expect(formatFiltersName('materials')).toBe('Материал');
    });
    it('should return empty str', () => {
        expect(formatFiltersName('modls')).toBe('');
        expect(formatFiltersName('categries')).toBe('');
    });
});