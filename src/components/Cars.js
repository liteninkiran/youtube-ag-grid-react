import { AgGridReact } from 'ag-grid-react';
import { useCallback, useRef, useState } from 'react';
import { createCar } from './carFactory';

const numberFormatter = Intl.NumberFormat('en-GB', {
    style: 'currency',
    currency: 'GBP',
    maximumFractionDigits: 0,
});
const myValueFormatter = (p) => numberFormatter.format(p.value);

const rowCount = 4;
const arr = new Array(rowCount);
let carData = [...arr].map(() => createCar());

const Cars = () => {
    const gridRef = useRef();
    const [rowData, setRowData] = useState(carData);
    const [columnDefs, setColumnDefs] = useState([
        { field: 'type', sortable: true },
        { field: 'year' },
        { field: 'colour' },
        { field: 'price', valueFormatter: myValueFormatter },
    ]);

    const onInsertOne = useCallback(() => {
        const newRecord = createCar();
        carData = [newRecord, ...carData];
        setRowData(carData);
    }, []);

    const getRowId = useCallback((params) => String(params.data.id), []);

    const onReverse = useCallback(() => {
        carData = [...carData].reverse();
        setRowData(carData);
    }, []);

    const onRemoveSelected = useCallback(() => {
        const selectedNodes = gridRef.current.api.getSelectedNodes();
        const selectedIds = selectedNodes.map((node) => node.data.id);
        carData = carData.filter((car) => selectedIds.indexOf(car.id) < 0);
        setRowData(carData);
    }, []);

    return (
        <div className='ag-theme-quartz' style={{ height: '100%' }}>
            <div>
                <button onClick={onInsertOne}>Insert One</button>
                <button onClick={onReverse}>Reverse</button>
                <button onClick={onRemoveSelected}>Remove Selected</button>
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
