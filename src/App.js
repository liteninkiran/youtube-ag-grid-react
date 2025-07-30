// AG Grid
import {
    AllCommunityModule,
    ModuleRegistry,
    RowSelectionModule,
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
    FiltersToolPanelModule,
    ColumnsToolPanelModule,
} from 'ag-grid-enterprise';
import 'ag-grid-enterprise';

// CSS
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-quartz.css';
import './App.css';

// Components
import SpaceMission from './components/SpaceMission';
import OlympicWinners from './components/OlympicWinners';
import Cars from './components/Cars';

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
]);

const App = () => {
    return (
        <div style={{ height: '90vh', margin: '20px' }}>
            {/* <SpaceMission /> */}
            {/* <OlympicWinners /> */}
            <Cars />
        </div>
    );
};

export default App;
