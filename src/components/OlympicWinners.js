// React
import { useEffect, useMemo, useRef, useState } from 'react';

// AG Grid
import { AgGridReact } from 'ag-grid-react';

const url = 'https://www.ag-grid.com/example-assets/olympic-winners.json';

const OlympicWinners = () => {
    const gridRef = useRef();
    const [rowData, setRowData] = useState();
    const [colDefs, setColDefs] = useState([
        { field: 'athlete' },
        { field: 'age' },
        { field: 'country' },
        { field: 'year' },
        { field: 'date' },
        { field: 'sport' },
        { field: 'gold' },
        { field: 'sliver' },
        { field: 'bronze' },
        { field: 'total' },
    ]);
    const memoFn = () => ({ sortable: true, filter: true });
    const effectFn = () => {
        fetch(url)
            .then((result) => result.json())
            .then((rowData) => setRowData(rowData));
    };
    const defaultColumnDef = useMemo(memoFn, []);
    useEffect(effectFn, []);

    return (
        <div style={{ height: '100vh' }}>
            <AgGridReact
                ref={gridRef}
                rowData={rowData}
                columnDefs={colDefs}
                defaultColumnDef={defaultColumnDef}
                theme='legacy'
                className='ag-theme-quartz'
            />
        </div>
    );
};

export default OlympicWinners;
