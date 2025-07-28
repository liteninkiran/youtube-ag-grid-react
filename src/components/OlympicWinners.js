// React
import { useEffect, useMemo, useRef, useState } from 'react';

// AG Grid
import { AgGridReact } from 'ag-grid-react';

const url = 'https://www.ag-grid.com/example-assets/olympic-winners.json';
const colDefs = [
    { field: 'athlete', enableRowGroup: true },
    { field: 'age', enableRowGroup: true },
    { field: 'country', enableRowGroup: true, rowGroup: true },
    { field: 'year', enableRowGroup: true },
    { field: 'date', enableRowGroup: true },
    { field: 'sport', enableRowGroup: true },
    { field: 'gold', enableRowGroup: true },
    { field: 'silver', enableRowGroup: true },
    { field: 'bronze', enableRowGroup: true },
    { field: 'total', enableRowGroup: true },
];

const OlympicWinners = () => {
    const gridRef = useRef();
    const [rowData, setRowData] = useState();

    const memoFn = () => ({
        sortable: true,
        filter: true,
        enableRowGroup: true,
    });
    const effectFn = () => {
        fetch(url)
            .then((result) => result.json())
            .then((rowData) => setRowData(rowData));
    };
    const defaultColumnDef = useMemo(memoFn, []);
    useEffect(effectFn, []);

    return (
        <AgGridReact
            ref={gridRef}
            rowData={rowData}
            columnDefs={colDefs}
            defaultColumnDef={defaultColumnDef}
            theme='legacy'
            className='ag-theme-quartz'
            rowGroupPanelShow='always'
        />
    );
};

export default OlympicWinners;
