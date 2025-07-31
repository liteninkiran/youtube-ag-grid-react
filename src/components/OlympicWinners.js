// React
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

// AG Grid
import { AgGridReact } from 'ag-grid-react';

const url = 'https://www.ag-grid.com/example-assets/olympic-winners.json';

const OlympicWinners = () => {
    const gridRef = useRef();
    const savedColState = useRef();
    const [rowData, setRowData] = useState();
    const [includeMedals, setIncludeMedals] = useState(true);
    const [agePinned, setAgePinned] = useState(undefined);
    const colDefs = useMemo(
        () => [
            { field: 'athlete' },
            {
                field: 'age',
                pinned: agePinned,
            },
            { field: 'country' },
            { field: 'year' },
            { field: 'date' },
            { field: 'sport' },
            { field: 'gold', hide: !includeMedals },
            { field: 'silver', hide: !includeMedals },
            { field: 'bronze', hide: !includeMedals },
            { field: 'total', hide: !includeMedals },
        ],
        [agePinned, includeMedals]
    );

    const toggleMedals = useCallback(() => {
        setIncludeMedals((val) => !val);
    }, []);

    const onSaveColState = useCallback(
        () => (savedColState.current = gridRef.current.api.getColumnState()),
        []
    );

    const onRestoreColState = useCallback(
        () =>
            gridRef.current.api.applyColumnState({
                state: savedColState.current,
                applyOrder: true,
            }),
        []
    );

    const onWidth = useCallback(
        () =>
            gridRef.current.api.applyColumnState({
                state: [
                    {
                        colId: 'athlete',
                        width: 100,
                    },
                ],
                defaultState: {
                    width: 300,
                },
            }),
        []
    );

    const onGroup = useCallback(
        () =>
            gridRef.current.api.applyColumnState({
                state: [
                    {
                        colId: 'athlete',
                        rowGroupIndex: 1,
                        hide: true,
                    },
                    {
                        colId: 'country',
                        rowGroupIndex: 0,
                        hide: true,
                    },
                    { colId: 'gold', aggFunc: 'sum' },
                    { colId: 'silver', aggFunc: 'sum' },
                    { colId: 'bronze', aggFunc: 'sum' },
                    { colId: 'total', aggFunc: 'sum' },
                ],
                applyOrder: true,
            }),
        []
    );

    const onGroupApi = useCallback(() => {
        gridRef.current.api.setRowGroupColumns(['country', 'athlete']);
        gridRef.current.api.setColumnsVisible(['country', 'athlete'], false);
        gridRef.current.api.setValueColumns([
            'gold',
            'silver',
            'bronze',
            'total',
        ]);
        gridRef.current.api.setColumnAggFunc('gold', 'sum');
        gridRef.current.api.setColumnAggFunc('silver', 'sum');
        gridRef.current.api.setColumnAggFunc('bronze', 'sum');
        gridRef.current.api.setColumnAggFunc('total', 'sum');
    }, []);

    const onSort = useCallback(
        () =>
            gridRef.current.api.applyColumnState({
                state: [
                    {
                        colId: 'gold',
                        sort: 'desc',
                        sortIndex: 0,
                    },
                    {
                        colId: 'silver',
                        sort: 'desc',
                        sortIndex: 1,
                    },
                ],
                defaultState: {
                    sort: null,
                },
            }),
        []
    );

    const defaultColDef = useMemo(
        () => ({
            resizable: true,
        }),
        []
    );
    useEffect(() => {
        fetch(url)
            .then((result) => result.json())
            .then((rowData) =>
                setRowData(rowData.filter((row) => row.athlete !== ''))
            );
    }, []);

    return (
        <div className='ag-theme-quartz' style={{ height: '100%' }}>
            <button onClick={toggleMedals}>
                {includeMedals ? 'Hide' : 'Show'} Medals
            </button>

            <br />
            <b>Pinning Columns</b>
            <br />

            <button onClick={() => setAgePinned('left')}>Left</button>
            <button onClick={() => setAgePinned('right')}>Right</button>
            <button onClick={() => setAgePinned(null)}>NULL</button>
            <button onClick={() => setAgePinned(undefined)}>undefined</button>

            <br />
            <b>Column State</b>
            <br />

            <button onClick={onSaveColState}>Save State</button>
            <button onClick={onRestoreColState}>Restore State</button>
            <button onClick={onWidth}>Width</button>
            <button onClick={onSort}>Sort</button>
            <button onClick={onGroup}>Group</button>

            <br />
            <b>Column API</b>
            <br />

            <button onClick={onGroupApi}>Group API</button>

            <AgGridReact
                ref={gridRef}
                rowData={rowData}
                columnDefs={colDefs}
                defaultColDef={defaultColDef}
                animateRows={true}
                theme='legacy'
                maintainColumnOrder={true}
            />
        </div>
    );
};

export default OlympicWinners;
