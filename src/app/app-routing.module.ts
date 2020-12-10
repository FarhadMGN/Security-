import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {StoreComponent} from './store/store.component';
import {LoginPageComponent} from './elements/login-page/login-page.component';

const routes: Routes = [
  {path: 'store', component: StoreComponent},
  {path: '', component: LoginPageComponent}
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
