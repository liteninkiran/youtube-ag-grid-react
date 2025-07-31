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
            { field: 'athlete' },
            { field: 'age' },
            { field: 'country' },
            { field: 'year' },
            { field: 'date' },
            { field: 'sport' },
            { field: 'gold', enableRowGroup: false },
            { field: 'silver', enableRowGroup: false },
            { field: 'bronze', enableRowGroup: false },
            { field: 'total', enableRowGroup: false },
        ],
        []
    );

    const printColumns = () => {
        const cols = gridRef.current.api.getAllGridColumns();
        console.log('Grid Columns', cols);
    };

    const defaultColDef = useMemo(
        () => ({
            resizable: true,
            suppressHeaderMenuButton: true,
            enableRowGroup: true,
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
            <button onClick={printColumns}>Print Columns</button>
            <AgGridReact
                ref={gridRef}
                rowData={rowData}
                columnDefs={colDefs}
                defaultColDef={defaultColDef}
                animateRows={true}
                theme='legacy'
                maintainColumnOrder={true}
                rowGroupPanelShow='always'
            />
        </div>
    );
};

export default OlympicWinners;
