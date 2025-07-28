// React
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

// AG Grid
import { AgGridReact } from 'ag-grid-react';

const url = 'https://www.ag-grid.com/example-assets/olympic-winners.json';
const SimpleComp = (p) => {
    const onPound = useCallback(() => window.alert(`Pound ${p.value}`));
    const onAt = useCallback(() => window.alert(`At ${p.value}`));
    return (
        <>
            <button onClick={onPound}>£</button>
            <button onClick={onAt}>@</button>
            {p.value}
        </>
    );
};

const colDefs = [
    { field: 'athlete', cellRenderer: SimpleComp },
    { field: 'age' },
    { field: 'country' },
    { field: 'year' },
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

    const memoFn = () => ({
        sortable: true,
        filter: true,
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
        />
    );
};

export default OlympicWinners;
