import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { Ng2OdometerModule } from 'ng2-odometer';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { CompareComponent } from './compare/compare.component';
import { YTService } from './shared/ytdata.service';
import { CompareSearchComponent } from './compare-search/compare-search.component';
import { SingleSearchComponent } from './single-search/single-search.component';

const appRoutes: Routes = [
{path: '', component: SingleSearchComponent},
{path: 'compare', component: CompareSearchComponent},
{path: 'pewdiepie-vs-tseries', component: CompareComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    CompareComponent,
    CompareSearchComponent,
    SingleSearchComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    Ng2OdometerModule.forRoot(),
    RouterModule.forRoot(appRoutes)
  ],
  providers: [YTService],
  bootstrap: [AppComponent]
})
export class AppModule { }
