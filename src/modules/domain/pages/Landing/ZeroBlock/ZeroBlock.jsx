import React from 'react';
import s from './ZeroBlock.module.scss';
import { ButtonDefault } from '../../../../../common/ui/components';
import { ZEROBLOCK_DICTIONARY } from './ZeroBlock.dictionary';
import { Link } from 'react-router-dom';
import { ROUTER_PATHS } from '../../../config';

const { TITLE_H1, TITLE_P, TITLE_P_MOBILE, BUTTON_TEXT } = ZEROBLOCK_DICTIONARY;

const ZeroBlock = () => {
    return (
        <div className={s.ZeroBlock}>
            <div className={s.ZeroBlock_content}>
                <div className={s.ZeroBlock_content_title}>
                    <div className={s.ZeroBlock_text}>
                        <h1>{TITLE_H1[0]}</h1>
                        <p>{TITLE_P[0]}</p>
                        <p>
                            {TITLE_P[1].split(';').map((line, index) => (
                                <React.Fragment key={index}>
                                    {line}
                                    {index !== TITLE_P[1].split(';').length - 1 && <br />}
                                </React.Fragment>
                            ))}
                        </p>
                        <h1>{TITLE_H1[1]}</h1>
                    </div>
                    <p className={s.ZeroBlock_text_mobile}>
                        {TITLE_P_MOBILE[0]}
                        <br />
                        {TITLE_P_MOBILE[1]}
                    </p>
                </div>
                <Link to={`/domain/${ROUTER_PATHS.catalog}`}>
                    <ButtonDefault text={BUTTON_TEXT} />
                </Link>
            </div>
        </div>
    );
};

export default ZeroBlock;
