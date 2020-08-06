import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CallbackComponent } from './callback/callback/callback.component';
import { AppComponent } from './app.component';

const routes: Routes = [
  { path: 'callback', component: CallbackComponent },
  {
    path: '',
    component: AppComponent,
    // canActivate: [OktaAuthGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
