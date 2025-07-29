import { useGridFilter } from 'ag-grid-react';
import { useCallback } from 'react';

const MyFilter = (props) => {
    // Props
    const { model, onModelChange, getValue } = props;

    // Functions
    const getVal = (val) => (val === '' ? null : val);
    const valueChangedFn = (p) => onModelChange(getVal(p.target.value));
    const doesFilterPassFn = ({ node }) => getValue(node) == model;
    const getModelAsStringFn = () => model;

    // Callbacks
    const valueChanged = useCallback(valueChangedFn, [onModelChange]);
    const doesFilterPass = useCallback(doesFilterPassFn, [getValue, model]);
    const getModelAsString = useCallback(getModelAsStringFn, [model]);

    // Filtering
    useGridFilter({ doesFilterPass, getModelAsString });

    return (
        <div>
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
