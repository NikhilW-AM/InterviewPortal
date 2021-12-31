import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TestComponent } from './test/test.component';
import { QeustionsComponent } from './qeustions/qeustions.component';
import { FinishComponent } from './finish/finish.component';

@NgModule({
  declarations: [AppComponent, TestComponent, QeustionsComponent, FinishComponent],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
