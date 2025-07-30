import { AgGridReact } from 'ag-grid-react';
import { useRef, useState } from 'react';
import { createCar } from './carFactory';

const numberFormatter = Intl.NumberFormat('en-GB', {
    style: 'currency',
    currency: 'GBP',
    maximumFractionDigits: 0,
});
const myValueFormatter = (p) => numberFormatter.format(p.value);

const rowCount = 50;
const arr = new Array(rowCount);
const cars = [...arr].map(() => createCar());

const Cars = () => {
    const gridRef = useRef();
    const [rowData, setRowData] = useState(cars);
    const columnDefs = [
        { field: 'type' },
        { field: 'year' },
        { field: 'colour' },
        { field: 'price', valueFormatter: myValueFormatter },
    ];

    return (
        <div className='ag-theme-quartz' style={{ height: '100%' }}>
            <AgGridReact
                ref={gridRef}
                rowData={rowData}
                animateRows={true}
                columnDefs={columnDefs}
                theme='legacy'
            />
        </div>
    );
};

export default Cars;
