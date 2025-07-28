// AG Grid
import {
    AllCommunityModule,
    ModuleRegistry,
    ClientSideRowModelModule,
} from 'ag-grid-community';
import { MenuModule } from 'ag-grid-enterprise';

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
]);

const App = () => {
    // return <SpaceMission />;
    return <OlympicWinners />;
};

export default App;
