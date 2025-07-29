// React
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

// AG Grid
import { AgGridReact } from 'ag-grid-react';

const url = 'https://www.ag-grid.com/example-assets/olympic-winners.json';

const colDefs = [
    {
        field: 'athlete',
        filter: 'agTextColumnFilter',
    },
    { field: 'age', filter: 'agNumberColumnFilter' },
    { field: 'country' },
    { field: 'year' },
    {
        field: 'date',
        filter: 'agDateColumnFilter',
    },
];

const OlympicWinners = () => {
    const gridRef = useRef();
    const [rowData, setRowData] = useState();

    const defaultColDefMemoFn = () => ({
        flex: 1,
        floatingFilter: true,
    });
    const effectFn = () => {
        fetch(url)
            .then((result) => result.json())
            .then((rowData) => setRowData(rowData));
    };
    const defaultColDef = useMemo(defaultColDefMemoFn, []);
    useEffect(effectFn, []);

    const savedFilteredState = useRef();

    const saveCallback = () => {
        const filterModel = gridRef.current.api.getFilterModel();
        savedFilteredState.current = filterModel;
    };
    const applyCallback = () => {
        const filterModel = savedFilteredState.current;
        gridRef.current.api.setFilterModel(filterModel);
    };
    const clearCallback = () => {
        gridRef.current.api.setFilterModel({});
    };

    const onSave = useCallback(saveCallback, []);
    const onApply = useCallback(applyCallback, []);
    const onClear = useCallback(clearCallback, []);

    return (
        <div style={{ height: '100%' }}>
            <div style={{ marginBottom: '20px' }}>
                <button
                    onClick={onSave}
                    style={{
                        marginRight: '20px',
                        height: '40px',
                        width: '100px',
                    }}
                >
                    Save
                </button>
                <button
                    onClick={onApply}
                    style={{
                        marginRight: '20px',
                        height: '40px',
                        width: '100px',
                    }}
                >
                    Apply
                </button>

                <button
                    onClick={onClear}
                    style={{
                        marginRight: '20px',
                        height: '40px',
                        width: '100px',
                    }}
                >
                    Clear Filters
                </button>
            </div>
            <div className='ag-theme-quartz' style={{ height: '100%' }}>
                <AgGridReact
                    ref={gridRef}
                    rowData={rowData}
                    columnDefs={colDefs}
                    defaultColDef={defaultColDef}
                    theme='legacy'
                />
            </div>
        </div>
    );
};

export default OlympicWinners;
