import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { InlineSVGModule } from 'ng-inline-svg';
import { AppComponent } from './app.component';
import { MapComponent } from './map/map.component';
import { HttpClientModule } from '@angular/common/http';
import { LegendComponent } from './legend/legend.component';
import { MaterialModule } from './material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MenuComponent } from './menu/menu.component';
import { MapService } from './map/map.service';
import { MapDragDirective } from './map/mapDrag.directive';

@NgModule({
  declarations: [
    AppComponent,
    MapComponent,
    LegendComponent,
    MenuComponent,
    MapDragDirective,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    InlineSVGModule.forRoot(),
    MaterialModule,
    BrowserAnimationsModule,
  ],
  providers: [MapService],
  bootstrap: [AppComponent]
})
export class AppModule { }
