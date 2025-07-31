// React
import { useEffect, useMemo, useRef, useState } from 'react';

// AG Grid
import { AgGridReact } from 'ag-grid-react';

const url = 'https://www.ag-grid.com/example-assets/olympic-winners.json';

const OlympicWinners = () => {
    const gridRef = useRef();
    const [rowData, setRowData] = useState();
    const colDefs = useMemo(
        () => [
            { field: 'athlete', rowGroupIndex: 1 },
            { field: 'age' },
            { field: 'country', rowGroupIndex: 0 },
            { field: 'year' },
            { field: 'date' },
            { field: 'sport' },
            { field: 'gold' },
            { field: 'silver' },
            { field: 'bronze' },
            { field: 'total' },
        ],
        []
    );

    const defaultColDef = useMemo(
        () => ({
            resizable: false,
            suppressHeaderMenuButton: true,
        }),
        []
    );
    useEffect(() => {
        fetch(url)
            .then((result) => result.json())
            .then((rowData) =>
                setRowData(rowData.filter((row) => row.athlete !== ''))
            );
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
                maintainColumnOrder={true}
            />
        </div>
    );
};

export default OlympicWinners;
