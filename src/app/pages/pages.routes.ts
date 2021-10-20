import { Route } from '@angular/router';
import { LayoutComponent } from 'app/layout/layout.component';
import { IndividuosDetailsComponent } from './admin/individuos-details/individuos-details.component';
import { ListIndividuosComponent } from './admin/list-individuos/list-individuos.component';
import { HomeComponent } from './home/home.component';
import { PageComponent } from './page.component';


export const pagesRoutes: Route[] = [
    {
        path: '',
        component: LayoutComponent,
        data: {
            layout: 'empty'
        },
        children:[
            {
                path     : '',
                component: PageComponent,
                children:[
                    {
                        path:'home',
                        component: HomeComponent

                    },
                    {
                        path     : 'individuos',
                        component: ListIndividuosComponent,
                        children : [
                            {
                                path         : ':id',
                                component    : IndividuosDetailsComponent,
                                canDeactivate: []
                            }
                        ]
                    }
                ]
            }
        ]
    }
];
