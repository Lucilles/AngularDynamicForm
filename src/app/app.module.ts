import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MatTreeModule } from '@angular/material/tree';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DynamicFormComponent } from './my-form/dynamic-form/dynamic-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SelectFormComponent } from './select-form/select-form.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { CapitalizePipe } from './pipes/captialize.pipe';
@NgModule({
  declarations: [
    AppComponent,
    SelectFormComponent,
    DynamicFormComponent,
    CapitalizePipe
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatTreeModule,
    MatCheckboxModule,
    MatInputModule,
    MatSelectModule,
  ],
  providers: [
    provideAnimationsAsync()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
