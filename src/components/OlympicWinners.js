// React
import { useEffect, useMemo, useRef, useState } from 'react';

// AG Grid
import { AgGridReact } from 'ag-grid-react';

const url = 'https://www.ag-grid.com/example-assets/olympic-winners.json';

const colDefs = [
    {
        field: 'athlete',
        tooltipField: 'country',
        headerTooltip: 'AG Grid',
    },
    {
        field: 'age',
        tooltipValueGetter: (p) => Math.random(),
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
    const defaultColDef = useMemo(
        () => ({
            width: 300,
        }),
        []
    );
    useEffect(() => {
        fetch(url)
            .then((result) => result.json())
            .then((rowData) => setRowData(rowData));
    }, []);

    return (
        <div className='ag-theme-quartz' style={{ height: '100%' }}>
            <AgGridReact
                ref={gridRef}
                rowData={rowData}
                columnDefs={colDefs}
                defaultColDef={defaultColDef}
                animateRows={true}
                theme='legacy'
            />
        </div>
    );
};

export default OlympicWinners;
