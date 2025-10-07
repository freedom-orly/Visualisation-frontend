import { Routes } from '@angular/router';
import { Dashboard } from './pages/dashboard/dashboard';
import { Upload } from './pages/upload/upload';
import { UploadDetails } from './pages/upload-details/upload-details';
import { Settings } from './pages/settings/settings';
import { Visualization } from './pages/visualization/visualization';
import { VisualizationDetails } from './pages/visualization-details/visualization-details';

export const routes: Routes = [
    {
        path: '',
        component: Dashboard,
    },
    {
        path: 'upload',
        component: Upload,
    },
    {
        path: 'upload/:id',
        component: UploadDetails,
    },
    {
        path: 'settings',
        component: Settings,
    },
    {
        path: 'visualization',
        component: Visualization,
    },
    {
        path: 'visualization/:id',
        component: VisualizationDetails,
    }
];
