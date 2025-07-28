// React
import { useEffect, useMemo, useRef, useState, memo } from 'react';

// AG Grid
import { AgGridReact } from 'ag-grid-react';

const url = 'https://www.ag-grid.com/example-assets/olympic-winners.json';

const MyComp = (props) => {
    const renderCount = useRef(1);
    return (
        <>
            <b>({renderCount.current++})</b> {props.value}
        </>
    );
};

const colDefs = [
    {
        field: 'athlete',
        cellRenderer: memo(MyComp),
    },
    {
        field: 'age',
        cellRenderer: memo(MyComp),
    },
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
        // cellRenderer: MyComp,
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
