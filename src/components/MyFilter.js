import { useGridFilter } from 'ag-grid-react';
import { useCallback } from 'react';

const MyFilter = (props) => {
    const { model, onModelChange, getValue } = props;
    const valueChangedFn = (p) => {
        const newValue = p.target.value;
        onModelChange(newValue === '' ? null : newValue);
    };
    const doesFilterPassFn = ({ node }) => getValue(node) == model;
    const valueChanged = useCallback(valueChangedFn, [onModelChange]);
    const doesFilterPass = useCallback(doesFilterPassFn, [getValue, model]);
    useGridFilter({ doesFilterPass });
    return (
        <>
            <input
                type='text'
                value={model || ''}
                placeholder='Filter'
                onChange={valueChanged}
            />
        </>
    );
};

export default MyFilter;
