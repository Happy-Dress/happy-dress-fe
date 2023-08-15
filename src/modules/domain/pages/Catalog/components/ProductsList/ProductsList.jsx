import s from './ProductsList.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import ProductCardSkeleton from '../../../../../../common/ui/components/ProductCard/ProductCardSkeleton';
import ProductCard from '../../../../../../common/ui/components/ProductCard/ProductCard';
import { useInView } from 'react-intersection-observer';
import classNames from 'classnames';
import { fetchCatalogueItems } from '../../../../../../common/ui/store/slices/productsSearchSlice';
import { useEffect } from 'react';

const ProductsList = () =>{

    const products = useSelector(state => state.productsSearch.products);
    const isLoading = useSelector(state => state.productsSearch.loading);
    const dispatch = useDispatch();
    const filters = useSelector(state => state.productsSearch.filters);
    const currentPage = useSelector(state => state.productsSearch.currentPage);
    const totalPages = useSelector(state => state.productsSearch.totalPages);

    const { ref, inView } = useInView({
        threshold: 0,
    });


    useEffect(() => {
        if(inView && currentPage < totalPages) {
            dispatch(fetchCatalogueItems({ filters, page: currentPage, isSecure: false }));
        }
    }, [inView]);

    const renderSkeletons = (amount) =>{
        return Array.from(Array(amount).keys()).map((item) => <ProductCardSkeleton key={item + products.length}/>);
    };

    return (
        <div className={s.ProductsList}>
            {products.map((product, index) => {
                return <ProductCard key={index} product={product}/>;
            })}
            {isLoading && renderSkeletons(15)}
            <div ref={ref} className={classNames(s.observingBlock, { [s.active]: !isLoading })}/>
        </div>
    );
};

export default ProductsList;
