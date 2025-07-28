// React
import {
    useCallback,
    useEffect,
    useMemo,
    useRef,
    useState,
    Component,
} from 'react';

// AG Grid
import { AgGridReact } from 'ag-grid-react';

const url = 'https://www.ag-grid.com/example-assets/olympic-winners.json';
const PushComp = (p) => {
    const onAt = useCallback(() => window.alert('Push'), []);
    return (
        <>
            <button onClick={onAt}>Push</button>
            {p.value}
        </>
    );
};

class PullComp extends Component {
    render() {
        return (
            <>
                <button onClick={() => window.alert('Pull')}>Pull</button>
                {this.props.value}
            </>
        );
    }
}

const colDefs = [
    { field: 'athlete', cellRenderer: PushComp },
    {
        field: 'age',
        cellRenderer: (p) => (
            <>
                <b>Age: </b>
                {p.value}
            </>
        ),
    },
    { field: 'country', cellRenderer: PullComp },
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
