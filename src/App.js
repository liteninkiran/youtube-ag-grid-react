// React
import { useMemo, useState } from 'react';

// AG Grid
import { AgGridReact } from 'ag-grid-react';
import {
    AllCommunityModule,
    ModuleRegistry,
    ClientSideRowModelModule,
} from 'ag-grid-community';
import { MenuModule } from 'ag-grid-enterprise';

// Data
import { data } from './data';

// CSS
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-quartz.css';
import './App.css';

ModuleRegistry.registerModules([
    AllCommunityModule,
    ClientSideRowModelModule,
    MenuModule,
]);

const App = () => {
    const [rowData, setRowData] = useState(data);

    const memoFn = () => ({
        flex: 1,
        filter: true,
        floatingFilter: true,
        editable: true,
    });

    const defaultColDef = useMemo(memoFn, []);

    // Column Definitions: Defines the columns to be displayed.
    const [colDefs, setColDefs] = useState([
        {
            field: 'mission',
            valueGetter: (p) => p.data.mission + ' ' + p.data.price,
            checkboxSelection: true,
        },
        {
            field: 'company',
        },
        {
            field: 'location',
        },
        {
            field: 'date',
        },
        {
            field: 'time',
        },
        {
            field: 'rocket',
        },
        {
            field: 'price',
            valueFormatter: (p) => '£' + p.value.toLocaleString(),
        },
        {
            field: 'successful',
        },
    ]);

    return (
        <div style={{ height: '100vh' }}>
            <AgGridReact
                rowData={rowData}
                columnDefs={colDefs}
                theme='legacy'
                className='ag-theme-quartz'
                defaultColDef={defaultColDef}
                rowSelection='multiple'
                pagination={true}
                paginationPageSize={15}
                paginationPageSizeSelector={[10, 15, 20, 25, 50, 100]}
            />
        </div>
    );
};

export default App;
