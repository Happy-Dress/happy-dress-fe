import React from 'react';
import s from './PCC_Header.module.scss';
import { PCC_Tab } from '../PCC_Tab/PCC_Tab';
import { ReactComponent as BarChar } from '../../../../../../../../common/assets/images/bar-chart-horizontal.svg';
import { ReactComponent as Arrow } from '../../../../../../../../common/assets/images/arrowDown.svg';
import { ReactComponent as Plus } from '../../../../../../../../common/assets/images/plus.svg';
import { PCC_HEADER_DICTIONARY } from './PCC_Header.dictionary';

const { SIZE, COLOUR } = PCC_HEADER_DICTIONARY;
const minSize = 40;
const sizesCount = 8;
const sizeStep = 2;
const sizes = Array(sizesCount).fill(null);

const sizeTabs = sizes.map((size, idx) => {
    return (
        <PCC_Tab key={idx}>{minSize + idx * sizeStep}</PCC_Tab>
    );
});

const selects = sizes.map((size, idx) => {
    return (
        <PCC_Tab key={idx} secondary>
            <div className={s.tabContent}>
                <BarChar />
                <Arrow className={s.arrow} />
            </div>
        </PCC_Tab>
    );
});

export const PCC_Header = () => {
    return (
        <div className={s.header}>
            <div className={s.headerRow}>
                <div className={s.headerCol}>
                    <PCC_Tab>{SIZE}</PCC_Tab>
                    <PCC_Tab>{COLOUR}</PCC_Tab>
                </div>
                {sizeTabs}
            </div>
            <div className={s.headerRow}>
                <div className={s.headerCol}>
                    <PCC_Tab secondary>
                        <Plus />
                    </PCC_Tab>
                </div>
                {selects}
            </div>
        </div>
    );
};
