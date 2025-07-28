// React
import { useEffect, useMemo, useState } from 'react';

// AG Grid
import { AgGridReact } from 'ag-grid-react';

const url = 'https://www.ag-grid.com/example-assets/space-mission-data.json';

const SpaceMission = () => {
    const [rowData, setRowData] = useState();

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
    const effectFn = () => {
        fetch(url)
            .then((result) => result.json())
            .then((rowData) => setRowData(rowData));
    };

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
    useEffect(effectFn, []);

    return (
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
    );
};

export default SpaceMission;
