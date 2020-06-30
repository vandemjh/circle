import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { NewPostComponent } from './new/new-post/new-post.component';
import { NewPostButtonComponent } from './new/new-post-button/new-post-button.component';
import { CommentsComponent } from './post/comments/comments.component';
import { PostComponent } from './post/post/post.component';
import { NewPostFormComponent } from './new/new-post-form/new-post-form.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    NewPostComponent,
    NewPostButtonComponent,
    CommentsComponent,
    PostComponent,
    NewPostFormComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
