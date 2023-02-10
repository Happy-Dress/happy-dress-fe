import { useState, createContext, useContext } from 'react';
const initialContext = {
    handleEdit: () => {},
    editingValue: null,
    setEditingValue: () => {},
    selectedOrderNumbers: null,
    setSelectedOrderNumbers: () => {},
    handleAdd: () => {},
    handleCancel: () => {},
    handleSelect: () => {},
    handleUnselect: () => {}
};
const EMPTY_NAME = '';
export const SettingsContext = createContext(initialContext);
export const useSettingsContext = () => useContext(SettingsContext);

export function withSettings(props) {
    const [editingValue, setEditingValue] = useState();
    const [selectedOrderNumbers, setSelectedOrderNumbers] = useState([]); 
    
    const handleCancel = () => {
        setEditingValue(null);
    };

    const handleAdd = () => {
        setEditingValue({ name: EMPTY_NAME });
    };

    const handleSelect = (material) => {
        setSelectedOrderNumbers([...selectedOrderNumbers, material.orderNumber]);
    };

    const handleUnselect = (material) => {
        setSelectedOrderNumbers(
            selectedOrderNumbers.filter(
                (orderNumber) => orderNumber !== material.orderNumber
            )
        );
    };
    const handleEdit = (material) => {
        setEditingValue(material);
    };
    
    return (
        <SettingsContext.Provider value={{ handleEdit, editingValue, setEditingValue, selectedOrderNumbers, setSelectedOrderNumbers, handleAdd, handleCancel, handleSelect, handleUnselect }}>
            {props.children}
        </SettingsContext.Provider>
    );
}

