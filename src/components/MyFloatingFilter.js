import { useCallback } from 'react';

const MyFloatingFilter = (props) => {
    // Props
    const { model, onModelChange } = props;

    // Functions
    const getVal = (val) => (val === '' ? null : val);
    const valueChangedFn = (p) => onModelChange(getVal(p.target.value));

    // Callbacks
    const valueChanged = useCallback(valueChangedFn, [onModelChange]);

    return (
        <div className='MyFilter'>
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

export default MyFloatingFilter;
