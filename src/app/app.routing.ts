import { Route } from '@angular/router';
import { BaseComponent } from './base.component';
import { AuthGuard } from './core/auth/guards/auth.guard';
import { NoAuthGuard } from './core/auth/guards/noAuth.guard';
import { LayoutComponent } from './layout/layout.component';


export const appRoutes: Route[] = [
    {path: '', pathMatch : 'full', component: BaseComponent},
    {path: 'signed-in-redirect', pathMatch : 'full', redirectTo: 'home'},

    // Admin routes
    {
        path       : '',
        canActivate: [AuthGuard],
        canActivateChild: [AuthGuard],
        component: LayoutComponent,
        data: {
            layout: 'empty'
        },
        children   : [
            {path: '', loadChildren: () => import('app/pages/pages.module').then(m => m.PagesModule)},
            {path: 'sign-out', loadChildren: () => import('app/pages/auth/sign-out/sign-out.module').then(m => m.AuthSignOutModule)}
        ]
    },
    {
        path: '',
        component: LayoutComponent,
        data: {
            layout: 'empty'
        },
        children: [
            {path: 'sign-in', loadChildren: () => import('app/pages/auth/sign-in/sign-in.module').then(m => m.AuthSignInModule)},
            {path: 'forgot-password', loadChildren: () => import('app/pages/auth/forgot-password/forgot-password.module').then(m => m.AuthForgotPasswordModule)},
            {path: 'reset-password', loadChildren: () => import('app/pages/auth/reset-password/reset-password.module').then(m => m.AuthResetPasswordModule)},
        ]
    },
];
