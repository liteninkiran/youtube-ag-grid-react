// React
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

// AG Grid
import { AgGridReact } from 'ag-grid-react';

const url = 'https://www.ag-grid.com/example-assets/olympic-winners.json';

const OlympicWinners = () => {
    const gridRef = useRef();
    const [rowData, setRowData] = useState();
    const [includeMedals, setIncludeMedals] = useState(true);
    const colDefs = useMemo(() => {
        const withMedals = [
            { field: 'athlete' },
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
        const withoutMedals = [
            { field: 'athlete' },
            { field: 'age' },
            { field: 'country' },
            { field: 'year' },
            { field: 'date' },
            { field: 'sport' },
        ];
        return includeMedals ? withMedals : withoutMedals;
    }, [includeMedals]);

    const toggleMedals = useCallback(() => {
        setIncludeMedals((val) => !val);
    }, []);

    const defaultColDef = useMemo(
        () => ({
            width: 100,
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
            <button onClick={toggleMedals}>Toggle</button>
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
