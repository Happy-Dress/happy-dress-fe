import React, { useEffect, useState } from 'react';
import axios from 'axios';
import s from './Blog.module.scss';
import ImageSkeleton from '../../../../common/ui/components/Image/ImageSkeleton';
import { useDeviceTypeContext } from '../../../../common/ui/contexts/DeviceType';

const Blog = () => {

    const [iframeSrcDoc, setIframeSrcDoc] = useState(null);
    const [showSkeleton, setShowSkeleton] = useState(true);

    const { isDesktop } = useDeviceTypeContext();


    useEffect(() => {
        axios.post('blog/search')
            .then((response) => {
                setIframeSrcDoc(response.data[0].htmlFile.file);
            });
    }, []);

    useEffect(() => {
        setTimeout(() => {
            const iframeElement = document.getElementById('idIframe');
            if (iframeElement && showSkeleton) {
                const iFrameHeight = iframeElement.contentWindow.document.body?.scrollHeight;
                if (iFrameHeight > 1800) {
                    iframeElement.height = iFrameHeight + 'px';
                    setShowSkeleton(false);
                } else {
                    setShowSkeleton(true);  
                }
            }
        }, 50);
        setTimeout(() => {
            const iframeElement = document.getElementById('idIframe');
            const imageSkeleton = document.getElementById('image-skeleton');
            if (imageSkeleton && iframeElement && iframeElement.contentDocument && iframeElement.contentDocument.location) {
                iframeElement.contentDocument.location.reload(true);
            }
        }, 1000);
    }, [iframeSrcDoc, showSkeleton]);
    

    return (
        <div className={s.Blog}>
            { showSkeleton && <ImageSkeleton
                height={'calc(100vh - 100px'}
                position={'absolute'}
                top={isDesktop ? '100px' : '70px'}
                left={'0'}
            /> }
            <iframe
                id={'idIframe'}
                title="Blog"
                width={'100%'}
                srcDoc={iframeSrcDoc}
            />
        </div>
    );
};

export default Blog;