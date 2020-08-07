import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { NewPostButtonComponent } from './new/new-post-button/new-post-button.component';
import { CommentsComponent } from './posts/comments/comments.component';
import { PostComponent } from './posts/post/post.component';
import { NewPostFormComponent } from './new/new-post-form/new-post-form.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatBadgeModule } from '@angular/material/badge';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatDialogModule } from '@angular/material/dialog';
import { MatChipsModule } from '@angular/material/chips';
import { HomeComponent } from './pages/home/home.component';
import {HttpInterceptorProviders} from './interceptors/http-interceptors'

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    NewPostButtonComponent,
    CommentsComponent,
    PostComponent,
    NewPostFormComponent,
    HomeComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatIconModule,
    MatMenuModule,
    MatCardModule,
    MatButtonModule,
    MatBadgeModule,
    MatExpansionModule,
    MatInputModule,
    MatListModule,
    MatDialogModule,
    HttpClientModule,
    ReactiveFormsModule,
    InfiniteScrollModule,
    MatChipsModule,
  ],
  providers: [HttpInterceptorProviders],
  bootstrap: [AppComponent],
})
export class AppModule {}
