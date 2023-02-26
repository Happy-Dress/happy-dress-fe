import s from './ProductsList.module.scss';
import ProductCardAdd from '../../../CatalogSettings/components/ProductCardAdd';
import { useSelector } from 'react-redux';
import ProductCardSkeleton from '../../../../../../common/ui/components/ProductCard/ProductCardSkeleton';
import ProductCard from '../../../../../../common/ui/components/ProductCard/ProductCard';

const ProductsList = () =>{

    const products = useSelector(state => state.productsSearch.products);
    const isLoading = useSelector(state => state.productsSearch.loading);

    const renderSkeletons = (amount) =>{
        return Array.from(Array(amount).keys()).map((item) => <ProductCardSkeleton key={item + products.length}/>);
    };

    return (
        <div className={s.ProductsList}>
            <ProductCardAdd/>
            {products.map((product, index) => {
                return <ProductCard key={index} product={product}/>;
            })}
            {isLoading && renderSkeletons(15)}
        </div>
    );
};

export default ProductsList;
