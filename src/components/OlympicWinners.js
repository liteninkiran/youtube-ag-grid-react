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
            { field: 'athlete', rowGroupIndex: 1, hide: true },
            { field: 'age' },
            { field: 'country', rowGroupIndex: 0, hide: true },
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

    const printColumns = () => {
        const cols = gridRef.current.api.getAllGridColumns();
        console.log('Grid Columns', cols);
    };

    const defaultColDef = useMemo(
        () => ({
            resizable: true,
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

    const autoGroupColumnDef = {
        headerName: 'Test',
        cellRenderer: 'agGroupCellRenderer',
        cellRendererParams: {
            suppressCount: true,
            // `cellRendererParams.checkbox` has been deprecated. Use `rowSelection.checkboxLocation = "autoGroupColumn"` instead.
            // checkbox: true,
            innerRenderer: (p) => <b>{p.value}</b>,
        },
        // field: 'sport',
    };

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
                autoGroupColumnDef={autoGroupColumnDef}
                showOpenedGroup={true}
            />
        </div>
    );
};

export default OlympicWinners;
