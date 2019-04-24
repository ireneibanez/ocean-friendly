import { BrowserModule } from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatButtonModule, MatMenuModule,   MatDatepickerModule, MatInputModule, MatNativeDateModule} from '@angular/material';
import { NgModule } from '@angular/core';
import { NgxMapboxGLModule } from 'ngx-mapbox-gl';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MapBoxComponent } from './shared/components/map/map-box.component';
import { HeaderComponent } from './shared/components/header/header.component';
import { LoginComponent } from './shared/components/header/login/login.component';
import { FormAnimalsComponent } from './shared/components/form-animals/form-animals.component';
import { FormRegisterComponent } from './shared/components/form-register/form-register.component';
import { FormLoginComponent } from './shared/components/form-login/form-login.component';

import { HomePageComponent } from './pages/home-page.component/home-page.component';
import { PanelPageComponent } from './pages/panel-page.component/panel-page.component';
import { PanelAdminPageComponent } from './pages/panel-page.component/panel-admin-page.component/panel-admin-page.component';
import { PanelUserPageComponent } from './pages/panel-page.component/panel-user-page.component/panel-user-page.component';
import { DashboardPageComponent } from './pages/dashboard-page.component/dashboard-page.component';
import { InfoPageComponent } from './pages/info-page.component/info-page.component';
import { PageNotFoundComponent } from './pages/page-not-found.component/page-not-found.component';

import {MatDialogModule} from '@angular/material/dialog';
import { FormBuilder, ReactiveFormsModule, FormsModule} from '@angular/forms';
import { MenuBtnComponent } from './shared/components/menu-btns/menu-btn.component';

import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { CanvasChartComponent } from '../app/shared/components/canvas-chart/canvas-chart.component';
import { SppInfoComponent } from '../app/shared/components/map/spp-info/spp-info.component';
import { ReproductionPlacesInfoComponent } from '../app/shared/components/map/reproduction-places-info/reproduction-places-info.component';
import { UserPanelComponent } from './user-panel/user-panel.component';

import { ClimateChangeService } from '../app/services/climateChange.service';
import { SightingService } from './services/sighting.service';
import { AuthService } from './services/auth.service';
import { TokenInterceptor } from './services/token.interceptor';

import { LoginGuard } from '../app/guards/login.guard';
import { SppPipe } from './pipes/spp.pipe';
import { StatusPipe } from './pipes/status.pipe';

@NgModule({
  declarations: [
    AppComponent,
    MapBoxComponent,
    HeaderComponent,
    LoginComponent,
    HomePageComponent,
    PanelPageComponent,
    PanelAdminPageComponent,
    PanelUserPageComponent,
    DashboardPageComponent,
    InfoPageComponent,
    PageNotFoundComponent,
    FormRegisterComponent,
    FormAnimalsComponent,
    FormLoginComponent,
    MenuBtnComponent,
    CanvasChartComponent,
    SppInfoComponent,
    ReproductionPlacesInfoComponent,
    UserPanelComponent,
    SppPipe,
    StatusPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatMenuModule,
    MatDialogModule,
    ReactiveFormsModule,
    FormsModule,
    MatDatepickerModule,
    MatInputModule,
    MatNativeDateModule,
    MatInputModule,
    HttpClientModule,
    NgxMapboxGLModule.withConfig({
      accessToken: 'pk.eyJ1IjoiY29ybmV0byIsImEiOiJjanJiMHB1bGkwOHRnNDludjhqazZvdWkwIn0.IigkRrS-arA3P8Jcvqrxcg',
    })
  ],
  providers: [FormBuilder, ClimateChangeService, SightingService, AuthService, LoginGuard, {
    provide: HTTP_INTERCEPTORS,
    useClass: TokenInterceptor,
    multi: true
  }],
  bootstrap: [AppComponent],
  entryComponents: [
    FormRegisterComponent,
    FormAnimalsComponent,
    FormLoginComponent,
    SppInfoComponent,
    ReproductionPlacesInfoComponent,
  ],

})
export class AppModule { }
