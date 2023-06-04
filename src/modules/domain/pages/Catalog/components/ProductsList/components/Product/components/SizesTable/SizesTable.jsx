import React from 'react';
import s from './SizesTable.module.scss';
import PropTypes from 'prop-types';

const SizesTable = (props) => {
    const {
        tableSizeHead,
        tableSizeBody,
    } = props;
    
    return (
        <div className={s.Table}>
            <table>
                <thead>
                    <tr>
                        {tableSizeHead.map((header, key) => (
                            <th key={key}>{header}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {tableSizeBody.map((row, key1) => (
                        <tr key={key1}>
                            {row.map((column, key2) => (
                                <td
                                    key={key2}
                                    className={key1 % 2 === 0 ? s.Table_even : s.Table_odd}
                                >{column}</td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

SizesTable.propTypes = {
    tableSizeHead: PropTypes.array.isRequired,
    tableSizeBody: PropTypes.array.isRequired,
};

export default SizesTable;