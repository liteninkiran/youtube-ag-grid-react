// React
import { useEffect, useMemo, useRef, useState } from 'react';

// AG Grid
import { AgGridReact } from 'ag-grid-react';

const url = 'https://www.ag-grid.com/example-assets/olympic-winners.json';
const src =
    'https://media0.giphy.com/media/v1.Y2lkPTc5MGI3NjExc3VuM3pmMG1ybWFtbGkwcjl4M2hra2t5ejdnY3BnYjBvODBtczQ2NSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/3ohhwiSbK4IdpTIB0Y/giphy.gif';

const MyComp = (props) => {
    const imgStyle = {
        width: 40,
        top: 0,
        left: 0,
        position: 'absolute',
    };
    const style = {
        marginLeft: 40,
    };
    return (
        <span style={style}>
            <img src={src} style={imgStyle} alt='Spinner' />
            {props.value}
        </span>
    );
};

const colDefs = [
    { field: 'athlete' },
    {
        field: 'age',
        cellRenderer: MyComp,
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
