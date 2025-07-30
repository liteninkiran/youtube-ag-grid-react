import { useGridFilter } from 'ag-grid-react';
import { useCallback, useEffect } from 'react';
import './styles.css';

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

    useEffect(() => {
        console.log('Filter Created');
        return () => console.log('Filter Destroyed');
    }, []);

    return (
        <div className='MyFilter'>
            <span>Filter:</span>
            <input
                className='MyFilterInput'
                type='text'
                value={model || ''}
                placeholder='Filter'
                onChange={valueChanged}
            />
        </div>
    );
};

export default MyFilter;
