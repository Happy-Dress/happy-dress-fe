import React from 'react';

const withSkeleton =
    ({ loading, skeleton }) =>
        (Component) =>
            (props) =>{
                return <>{loading? skeleton: <Component {...props} />}</>;
            };

export default withSkeleton;
