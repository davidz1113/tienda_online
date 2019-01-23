import { Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { LoginComponent } from './Login/login.component';
import { LayoutComponent } from './principal/layout/layout.component';


export const AppRoutes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        component: LoginComponent
    },
    {
        path: 'login',
        component: LoginComponent
    },
    {
        path: 'login/:id',
        component: LoginComponent
    },
    {
        path: 'principal',
        component: LayoutComponent
    }


]