import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ZukanComponent } from './zukan.component';

const routes: Routes = [{ path: '', component: ZukanComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ZukanRoutingModule { }
