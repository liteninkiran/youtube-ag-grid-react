import { AgGridReact } from 'ag-grid-react';
import { useCallback, useRef, useState } from 'react';
import { createCar } from './carFactory';

const numberFormatter = Intl.NumberFormat('en-GB', {
    style: 'currency',
    currency: 'GBP',
    maximumFractionDigits: 0,
});
const myValueFormatter = (p) => numberFormatter.format(p.value);

const rowCount = 5;
const arr = new Array(rowCount);
let carData = [...arr].map(() => createCar());

const Cars = () => {
    const gridRef = useRef();
    const [rowData, setRowData] = useState(carData);
    const columnDefs = [
        { field: 'type' },
        { field: 'year' },
        { field: 'colour' },
        { field: 'price', valueFormatter: myValueFormatter },
    ];

    const insertOne = () => {
        const newRecord = createCar();
        carData = [newRecord, ...carData];
        setRowData(carData);
    };

    const getRowId = useCallback((params) => String(params.data.id), []);

    return (
        <div className='ag-theme-quartz' style={{ height: '100%' }}>
            <div>
                <button onClick={insertOne}>Insert One</button>
            </div>
            <AgGridReact
                ref={gridRef}
                rowData={rowData}
                animateRows={true}
                columnDefs={columnDefs}
                theme='legacy'
                rowSelection={{ mode: 'multiRow' }}
                getRowId={getRowId}
            />
        </div>
    );
};

export default Cars;
