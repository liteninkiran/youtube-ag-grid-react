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
// import 'ag-grid-community/styles/ag-theme-material.css';
// import 'ag-grid-community/styles/ag-theme-alpine.css';
import './App.css';

ModuleRegistry.registerModules([
    AllCommunityModule,
    ClientSideRowModelModule,
    MenuModule,
]);

const App = () => {
    const [rowData, setRowData] = useState(data);

    const defaultColDefMemoFn = () => ({
        flex: 1,
        filter: true,
        floatingFilter: true,
        editable: true,
    });

    const rowClassRuleMemoFn = () => ({
        'red-row': (p) => p.data.company === 'SpaceX',
    });

    const rowSelectionMemoFn = () => ({
        mode: 'multiRow',
        checkboxes: 'mission',
        headerCheckbox: true,
        enableSelectionWithoutKeys: true,
        enableClickSelection: true,
    });

    // Column Definitions: Defines the columns to be displayed.
    const [colDefs, setColDefs] = useState([
        {
            field: 'mission',
            valueGetter: (p) => p.data.mission + ' ' + p.data.price,
            // checkboxSelection: true,
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
            cellClassRules: {
                'green-cell': (p) => p.value > 20000000,
            },
        },
        {
            field: 'successful',
        },
    ]);

    const defaultColDef = useMemo(defaultColDefMemoFn, []);
    const rowClassRules = useMemo(rowClassRuleMemoFn, []);
    const rowSelection = useMemo(rowSelectionMemoFn, []);

    return (
        <div style={{ height: '100vh' }}>
            <AgGridReact
                rowData={rowData}
                columnDefs={colDefs}
                theme='legacy'
                className='ag-theme-quartz'
                defaultColDef={defaultColDef}
                rowSelection={rowSelection}
                pagination={true}
                paginationPageSize={15}
                paginationPageSizeSelector={[10, 15, 20, 25, 50, 100]}
                rowClassRules={rowClassRules}
            />
        </div>
    );
};

export default App;
