import {NgModule, isDevMode} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {ServiceWorkerModule} from '@angular/service-worker';
import {SearchBarComponent} from './components/search/search-bar.component';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {NgIf} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MenuComponent} from './components/menu/menu.component';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {NewsComponent} from './components/news/news.component';
import {MatCardModule} from '@angular/material/card';
import {ChipComponent} from './components/chip/chip.component';
import {MatChipsModule} from '@angular/material/chips';
import {MatPaginatorModule} from '@angular/material/paginator';
import {RouterModule} from '@angular/router';
import {HomeComponent} from './components/home/home.component';
import {TopicComponent} from './components/topic/topic.component';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule} from '@angular/material/core';
import {DateComponent} from './components/date/date.component';
import {HttpClientModule} from '@angular/common/http';
import {DateFormatPipe} from './pipes/date-format.pipe';
import {ThemeService} from './services/theme.service';
import {SortComponent} from "./components/sort/sort.component";
import {MatSelectModule} from "@angular/material/select";
import {SourceComponent} from "./components/source/source.component";
import {MatListModule} from "@angular/material/list";
import {MatDialogModule} from "@angular/material/dialog";
import {MatSnackBarModule} from "@angular/material/snack-bar";
import { FilterComponent } from './components/filter/filter.component';

@NgModule({
    declarations: [
        AppComponent,
        SearchBarComponent,
        MenuComponent,
        NewsComponent,
        ChipComponent,
        HomeComponent,
        TopicComponent,
        DateComponent,
        DateFormatPipe,
        SortComponent,
        SourceComponent,
        FilterComponent
    ],
    imports: [
        RouterModule,
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        MatFormFieldModule,
        MatInputModule,
        FormsModule,
        NgIf,
        MatButtonModule,
        MatIconModule,
        MatToolbarModule,
        MatProgressBarModule,
        MatCardModule,
        MatChipsModule,
        MatPaginatorModule,
        MatDatepickerModule,
        MatNativeDateModule,
        HttpClientModule,
        ServiceWorkerModule.register('ngsw-worker.js', {
            enabled: !isDevMode(),
            registrationStrategy: 'registerWhenStable:30000'
        }),
        ReactiveFormsModule,
        MatSelectModule,
        MatListModule,
        MatDialogModule,
        MatSnackBarModule
    ],
    providers: [ThemeService],
    bootstrap: [AppComponent]
})
export class AppModule {
}
