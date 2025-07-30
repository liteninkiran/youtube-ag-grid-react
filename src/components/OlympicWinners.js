// React
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

// AG Grid
import { AgGridReact } from 'ag-grid-react';

const url = 'https://www.ag-grid.com/example-assets/olympic-winners.json';

const OlympicWinners = () => {
    const gridRef = useRef();
    const [rowData, setRowData] = useState();
    const [includeMedals, setIncludeMedals] = useState(true);
    const [cap, setCap] = useState(false);
    const colDefs = useMemo(
        () => [
            {
                // field: 'athlete',
                colId: 'athlete',
                valueGetter: (p) => p.data.athlete,
                headerName: 'Athlete',
                initialWidth: 100,
            },
            {
                field: 'age',
                initialWidth: 100,
            },
            { field: 'country' },
            { field: 'year' },
            { field: 'date' },
            { field: 'sport' },
            { field: 'gold', hide: !includeMedals },
            { field: 'silver', hide: !includeMedals },
            { field: 'bronze', hide: !includeMedals },
            { field: 'total', hide: !includeMedals },
        ],
        [includeMedals]
    );

    const toggleMedals = useCallback(() => {
        setIncludeMedals((val) => !val);
    }, []);

    const toggleCap = useCallback(() => {
        setCap((val) => !val);
    }, []);

    const defaultColDef = useMemo(
        () => ({
            resizable: true,
            headerComponent: (props) => (
                <>{cap ? props.displayName.toUpperCase() : props.displayName}</>
            ),
        }),
        [cap]
    );
    useEffect(() => {
        fetch(url)
            .then((result) => result.json())
            .then((rowData) => setRowData(rowData));
    }, []);

    return (
        <div className='ag-theme-quartz' style={{ height: '100%' }}>
            <button onClick={toggleMedals}>
                {includeMedals ? 'Hide' : 'Show'} Medals
            </button>
            <button onClick={toggleCap}>{cap ? 'Normal' : 'CAPS'}</button>
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
