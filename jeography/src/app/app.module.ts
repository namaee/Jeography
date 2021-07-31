import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { InlineSVGModule } from 'ng-inline-svg';
import { AppComponent } from './app.component';
import { MapComponent } from './map/map.component';
import { HttpClientModule } from '@angular/common/http';
import { LegendComponent } from './legend/legend.component';
import { MaterialModule } from './material.module';

@NgModule({
  declarations: [
    AppComponent,
    MapComponent,
    LegendComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    InlineSVGModule.forRoot(),
    MaterialModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
