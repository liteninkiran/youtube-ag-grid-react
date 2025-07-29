import { useGridFilter } from 'ag-grid-react';
import { useCallback } from 'react';

const MyFilter = (props) => {
    const { model, onModelChange, getValue, title } = props;
    const valueChangedFn = (p) => {
        const newValue = p.target.value;
        onModelChange(newValue === '' ? null : newValue);
    };
    const doesFilterPassFn = ({ node }) => getValue(node) == model;
    const valueChanged = useCallback(valueChangedFn, [onModelChange]);
    const doesFilterPass = useCallback(doesFilterPassFn, [getValue, model]);
    useGridFilter({ doesFilterPass });
    return (
        <div>
            <h3>{title}</h3>
            <input
                type='text'
                value={model || ''}
                placeholder='Filter'
                onChange={valueChanged}
            />
        </div>
    );
};

export default MyFilter;
