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
    // {
    //     headerName: 'Medals',
    //     marryChildren: true,
    //     children: [
    //         { field: 'total', columnGroupShow: 'closed' },
    //         { field: 'gold', columnGroupShow: 'open' },
    //         { field: 'silver', columnGroupShow: 'open' },
    //         { field: 'bronze', columnGroupShow: 'open' },
    //     ],
    // },
    {
        headerName: 'Level 1',
        children: [
            {
                headerName: 'Level 2',
                children: [
                    {
                        headerName: 'Level 3',
                        children: [{ field: 'country' }, { field: 'year' }],
                    },
                ],
            },
        ],
    },
    // { field: 'country' },
    // { field: 'year' },
    { field: 'date' },
    { field: 'sport' },

    { field: 'total', columnGroupShow: 'closed' },
    { field: 'gold', columnGroupShow: 'open' },
    { field: 'silver', columnGroupShow: 'open' },
    { field: 'bronze', columnGroupShow: 'open' },
];

const OlympicWinners = () => {
    const gridRef = useRef();
    const [rowData, setRowData] = useState();
    const defaultColDef = useMemo(() => ({}), []);
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
