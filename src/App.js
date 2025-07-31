// AG Grid
import {
    AllCommunityModule,
    ColumnApiModule,
    ModuleRegistry,
    RowSelectionModule,
    TooltipModule,
} from 'ag-grid-community';
import {
    MenuModule,
    RowGroupingModule,
    RowGroupingPanelModule,
    SetFilterModule,
    ClientSideRowModelModule,
    MultiFilterModule,
    StatusBarModule,
    SideBarModule,
    ColumnsToolPanelModule,
    PivotModule,
} from 'ag-grid-enterprise';
import 'ag-grid-enterprise';

// CSS
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-quartz.css';
import './App.css';

// Components
import SpaceMission from './components/SpaceMission';
import OlympicWinners from './components/OlympicWinners';

ModuleRegistry.registerModules([
    AllCommunityModule,
    ClientSideRowModelModule,
    MenuModule,
    RowGroupingModule,
    RowGroupingPanelModule,
    SetFilterModule,
    MultiFilterModule,
    StatusBarModule,
    SideBarModule,
    ColumnsToolPanelModule,
    RowSelectionModule,
    TooltipModule,
    ColumnApiModule,
    PivotModule,
]);

const App = () => {
    return (
        <div style={{ height: '90vh', margin: '20px' }}>
            {/* <SpaceMission /> */}
            <OlympicWinners />
        </div>
    );
};

export default App;
