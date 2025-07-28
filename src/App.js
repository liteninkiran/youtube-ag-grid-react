import { AgGridReact } from 'ag-grid-react';
import { AllCommunityModule, ModuleRegistry } from 'ag-grid-community';
import { MenuModule } from 'ag-grid-enterprise';
import { ClientSideRowModelModule } from 'ag-grid-community';

import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-quartz.css';
import './App.css';
import { useMemo, useState } from 'react';

ModuleRegistry.registerModules([
    AllCommunityModule,
    ClientSideRowModelModule,
    MenuModule,
]);

const MyCellComponent = (p) => {
    return (
        <>
            <button
                onClick={() => window.alert('Action')}
                style={{ marginRight: '10px' }}
            >
                +
            </button>
            {p.value}
        </>
    );
};

const App = () => {
    const [rowData, setRowData] = useState([
        { make: 'Tesla', model: 'Model Y', price: 64950, electric: true },
        { make: 'Ford', model: 'F-Series', price: 33850, electric: false },
        { make: 'Toyota', model: 'Corolla', price: 29600, electric: false },
    ]);

    const memoFn = () => ({
        flex: 1,
    });

    const defaultColDef = useMemo(memoFn, []);

    // Column Definitions: Defines the columns to be displayed.
    const [colDefs, setColDefs] = useState([
        {
            field: 'make',
            valueGetter: (p) => p.data.make + ' ' + p.data.price,
            headerName: 'Company',
            cellRenderer: MyCellComponent,
            flex: 2,
        },
        {
            field: 'model',
        },
        {
            field: 'price',
            valueFormatter: (p) => '£' + p.value.toLocaleString(),
        },
        {
            field: 'electric',
        },
    ]);

    return (
        <div style={{ height: 500 }}>
            <AgGridReact
                rowData={rowData}
                columnDefs={colDefs}
                theme='legacy'
                className='ag-theme-quartz'
                defaultColDef={defaultColDef}
            />
        </div>
    );
};

export default App;
