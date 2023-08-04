import React from 'react';
import PropTypes from 'prop-types';
import { DropdownSelect } from '../../../../../../../../../../common/ui/components/DropdownSelect';

const AvailabilitySizeTab = ({ handleChangeSize, isAvailable, idx }) => {
    return (
        <DropdownSelect
            name={`size${idx}`}
            options={[
                { value: 'true', label: 'В наличии' },
                { value: 'false', label: 'Нет в наличии' },
            ]}
            defaultValues={isAvailable ? ['true'] : ['false']}
            size={'small'}
            onChange={handleChangeSize}
        />
    );
};

AvailabilitySizeTab.propTypes = {
    handleChangeSize: PropTypes.func.isRequired,
    isAvailable: PropTypes.bool,
    idx: PropTypes.string,
};

export default AvailabilitySizeTab;