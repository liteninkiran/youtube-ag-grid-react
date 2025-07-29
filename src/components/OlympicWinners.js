// React
import { useEffect, useMemo, useRef, useState } from 'react';

// AG Grid
import { AgGridReact } from 'ag-grid-react';

const url = 'https://www.ag-grid.com/example-assets/olympic-winners.json';

const colDefs = [
    { field: 'athlete', filter: 'agTextColumnFilter' },
    { field: 'age', filter: 'agNumberColumnFilter' },
    { field: 'country' },
    { field: 'year' },
    { field: 'date', filter: 'agDateColumnFilter' },
];

const OlympicWinners = () => {
    const gridRef = useRef();
    const [rowData, setRowData] = useState();

    const memoFn = () => ({
        flex: 1,
        filterParams: {
            debounceMs: 2000,
            buttons: ['apply', 'clear', 'cancel', 'reset'],
        },
    });
    const effectFn = () => {
        fetch(url)
            .then((result) => result.json())
            .then((rowData) => setRowData(rowData));
    };
    const defaultColDef = useMemo(memoFn, []);
    useEffect(effectFn, []);

    return (
        <AgGridReact
            ref={gridRef}
            rowData={rowData}
            columnDefs={colDefs}
            defaultColDef={defaultColDef}
            theme='legacy'
        />
    );
};

export default OlympicWinners;
