// React
import { useEffect, useMemo, useRef, useState } from 'react';

// AG Grid
import { AgGridReact } from 'ag-grid-react';

import MyFilter from './MyFilter';

const url = 'https://www.ag-grid.com/example-assets/olympic-winners.json';

const colDefs = [
    { field: 'athlete' },
    {
        field: 'year',
        filter: MyFilter,
        floatingFilter: true,
    },
    { field: 'age' },
    { field: 'country' },
    { field: 'date' },
    { field: 'sport' },
    { field: 'gold' },
    { field: 'silver' },
    { field: 'bronze' },
    { field: 'total' },
];

const OlympicWinners = () => {
    const gridRef = useRef();
    const [rowData, setRowData] = useState();

    const defaultColDefMemoFn = () => ({
        flex: 1,
        editable: true,
    });
    const effectFn = () => {
        fetch(url)
            .then((result) => result.json())
            .then((rowData) => setRowData(rowData));
    };
    const defaultColDef = useMemo(defaultColDefMemoFn, []);
    useEffect(effectFn, []);

    return (
        <div className='ag-theme-quartz' style={{ height: '100%' }}>
            <div style={{ height: '100%' }}>
                <AgGridReact
                    ref={gridRef}
                    rowData={rowData}
                    columnDefs={colDefs}
                    defaultColDef={defaultColDef}
                    animateRows={true}
                    theme='legacy'
                />
            </div>
        </div>
    );
};

export default OlympicWinners;
