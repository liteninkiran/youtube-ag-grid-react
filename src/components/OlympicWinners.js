// React
import { useEffect, useMemo, useRef, useState } from 'react';

// AG Grid
import { AgGridReact } from 'ag-grid-react';

const url = 'https://www.ag-grid.com/example-assets/olympic-winners.json';

const colDefs = [
    { field: 'athlete' },
    { field: 'age' },
    { field: 'country' },
    { field: 'year' },
    { field: 'date' },
];

const OlympicWinners = () => {
    const gridRef = useRef();
    const [rowData, setRowData] = useState();

    const memoFn = () => ({
        sortable: true,
        filter: true,
        floatingFilter: true,
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
            defaultColDef={defaultColumnDef}
            theme='legacy'
        />
    );
};

export default OlympicWinners;
