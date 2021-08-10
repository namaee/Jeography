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
import { QuizComponent } from './quiz/quiz.component';
import { QuestionComponent } from './quiz/question/question.component';
import { ScoreComponent } from './quiz/score/score.component';
import { QuizService } from './quiz/quiz.service';
import { SettingsComponent } from './quiz/settings/settings.component';
import { SettingsService } from './quiz/settings/settings.service';
import { SearchService } from './search/search.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SearchComponent } from './search/search.component';
import { ColorService } from './color.service';


@NgModule({
  declarations: [
    AppComponent,
    MapComponent,
    LegendComponent,
    MenuComponent,
    MapDragDirective,
    QuizComponent,
    QuestionComponent,
    ScoreComponent,
    SettingsComponent,
    SearchComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    InlineSVGModule.forRoot(),
    MaterialModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [MapService, QuizService, SettingsService, SearchService, ColorService],
  bootstrap: [AppComponent]
})
export class AppModule { }
