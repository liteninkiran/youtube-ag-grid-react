import { AgGridReact } from 'ag-grid-react';
import { useCallback, useMemo, useRef, useState } from 'react';
import { createCar } from './carFactory';

const numberFormatter = Intl.NumberFormat('en-GB', {
    style: 'currency',
    currency: 'GBP',
    maximumFractionDigits: 0,
});
const myValueFormatter = (p) => numberFormatter.format(p.value);

const rowCount = 15;
const arr = new Array(rowCount);
let carData = [...arr].map(() => createCar());

const Cars = () => {
    const gridRef = useRef();
    const [rowData, setRowData] = useState(carData);
    const [columnDefs, setColumnDefs] = useState([
        { field: 'type', sortable: true },
        { field: 'year' },
        { field: 'colour' },
        {
            field: 'price',
            valueFormatter: myValueFormatter,
            cellRenderer: 'agAnimateShowChangeCellRenderer',
        },
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

    const onRemove = useCallback(() => {
        const selectedNodes = gridRef.current.api.getSelectedNodes();
        const selectedIds = selectedNodes.map((node) => node.data.id);
        carData = carData.filter((car) => selectedIds.indexOf(car.id) < 0);
        setRowData(carData);
    }, []);

    const onUpdate = useCallback(() => {
        const decider = (i = 0.5) => Math.random() > i;
        const newPrice = (car) =>
            car.price + (1000 - Math.floor(Math.random() * 2000));
        const getUpdatedCar = (car) => ({ ...car, price: newPrice(car) });
        const updateCar = (car) => (decider() ? car : getUpdatedCar(car));
        carData = carData.map(updateCar);
        setRowData(carData);
    }, []);

    const defaultColDef = useMemo(
        () => ({
            // enableCellChangeFlash: true,
        }),
        []
    );

    return (
        <div className='ag-theme-quartz' style={{ height: '100%' }}>
            <div>
                <button onClick={onInsertOne}>Insert One</button>
                <button onClick={onReverse}>Reverse</button>
                <button onClick={onRemove}>Remove Selected</button>
                <button onClick={onUpdate}>Update Some</button>
            </div>
            <AgGridReact
                ref={gridRef}
                rowData={rowData}
                animateRows={true}
                columnDefs={columnDefs}
                theme='legacy'
                rowSelection={{ mode: 'multiRow' }}
                getRowId={getRowId}
                defaultColDef={defaultColDef}
            />
        </div>
    );
};

export default Cars;
