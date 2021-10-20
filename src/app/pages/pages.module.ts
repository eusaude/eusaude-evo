import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { FuseNavigationModule } from '@fuse/components/navigation';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatRippleModule, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatTableModule } from '@angular/material/table';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatTabsModule } from '@angular/material/tabs';
import { NgxMaskModule, IConfig } from 'ngx-mask';

import { FuseFindByKeyPipeModule } from '@fuse/pipes/find-by-key';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatSortModule } from '@angular/material/sort';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { NgApexchartsModule } from 'ng-apexcharts';

import { pagesRoutes } from './pages.routes';
import { IndividuosDetailsComponent } from './admin/individuos-details/individuos-details.component';
import { ListIndividuosComponent } from './admin/list-individuos/list-individuos.component';

import { DashboardAtendimentosComponent } from './dashboard/atendimentos/atendimentos.component';
import { DashboardNpsComponent } from './dashboard/nps/nps.component';
import { DashboardEquipesComponent } from './dashboard/equipes/equipes.component';
import { PageComponent } from './page.component';
import { PagesService } from './pages.service';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { FuseSplashScreenModule } from '@fuse/services/splash-screen';


export const options: Partial<IConfig> | (() => Partial<IConfig>) = null;


@NgModule({
  declarations: [
    HomeComponent,
    IndividuosDetailsComponent,
    ListIndividuosComponent,
    DashboardAtendimentosComponent,
    DashboardNpsComponent,
    DashboardEquipesComponent,
    PageComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(pagesRoutes),
    NgxMaskModule.forChild(),
    FuseNavigationModule,
    FuseSplashScreenModule,
    MatButtonToggleModule,
    MatSortModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    MatCheckboxModule,
    MatDatepickerModule,
    MatDividerModule,
    MatFormFieldModule,
    MatSlideToggleModule,
    FormsModule,
    MatSnackBarModule,
    ReactiveFormsModule,
    MatIconModule,
    MatInputModule,
    MatMenuModule,
    MatMomentDateModule,
    MatProgressBarModule,
    MatRadioModule,
    MatRippleModule,
    MatSelectModule,
    MatSidenavModule,
    MatTableModule,
    MatTooltipModule,
    MatCardModule,
    MatGridListModule,
    MatTabsModule,
    NgApexchartsModule,
    FuseFindByKeyPipeModule,
    FuseNavigationModule,
    MatButtonModule,
    MatCheckboxModule,
    MatDatepickerModule,
    MatDividerModule,
    MatFormFieldModule,
    MatSlideToggleModule,
    FormsModule,
    ReactiveFormsModule,
    MatIconModule,
    MatInputModule,
    MatMenuModule,
    MatMomentDateModule,
    MatProgressBarModule,
    MatRadioModule,
    MatRippleModule,
    MatSelectModule,
    MatSidenavModule,
    MatTableModule,
    MatTooltipModule,
    FuseFindByKeyPipeModule
  ],
  providers: [{ provide: MAT_DATE_LOCALE, useValue: 'pt-BR' },{
    provide: MAT_DATE_FORMATS,
    useValue: {
      display: {
        dateInput: 'DD/MM/YYYY',
        monthYearLabel: 'MMM YYYY',
        dateA11yLabel: 'LL',
        monthYearA11yLabel: 'MMMM YYYY',
      }
    }
  }, PagesService]
})
export class PagesModule { }
