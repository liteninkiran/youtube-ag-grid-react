// React
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

// AG Grid
import { AgGridReact } from 'ag-grid-react';

const url = 'https://www.ag-grid.com/example-assets/olympic-winners.json';

const OlympicWinners = () => {
    const gridRef = useRef();
    const [rowData, setRowData] = useState();
    const [includeMedals, setIncludeMedals] = useState(true);
    const [agePinned, setAgePinned] = useState(undefined);
    const colDefs = useMemo(
        () => [
            { field: 'athlete' },
            {
                field: 'age',
                pinned: agePinned,
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
        [agePinned, includeMedals]
    );

    const toggleMedals = useCallback(() => {
        setIncludeMedals((val) => !val);
    }, []);

    const defaultColDef = useMemo(
        () => ({
            resizable: true,
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
            <button onClick={toggleMedals}>
                {includeMedals ? 'Hide' : 'Show'} Medals
            </button>

            <button onClick={() => setAgePinned('left')}>Left</button>
            <button onClick={() => setAgePinned('right')}>Right</button>
            <button onClick={() => setAgePinned(null)}>NULL</button>
            <button onClick={() => setAgePinned(undefined)}>undefined</button>

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
