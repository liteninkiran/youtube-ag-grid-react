import { useGridFilter } from 'ag-grid-react';
import { useCallback } from 'react';

const MyFilter = (props) => {
    const { model, onModelChange, getValue, colDef } = props;
    const valueChangedFn = (p) => {
        const newValue = p.target.value;
        onModelChange(newValue === '' ? null : newValue);
    };
    const doesFilterPassFn = ({ data }) => data[colDef.field] == model;
    const valueChanged = useCallback(valueChangedFn, [onModelChange]);
    const doesFilterPass = useCallback(doesFilterPassFn, [colDef.field, model]);
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
