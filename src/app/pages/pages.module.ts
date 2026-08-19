import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { MatToolbarModule } from '@angular/material/toolbar';
import { ReactiveFormsModule } from '@angular/forms';


import { PagesRoutingModule } from './pages-routing.module';
import { HogeComponent } from './hoge/hoge.component';
import { FugaComponent } from './fuga/fuga.component';
import { PiyoComponent } from './piyo/piyo.component';
import { HeaderComponent } from './shared/header/header.component';
import { SideMenuComponent } from './shared/side-menu/side-menu.component';
import { QuizComponent } from './quiz/quiz.component';


@NgModule({
  declarations: [
    HogeComponent,
    FugaComponent,
    PiyoComponent,
    HeaderComponent,
    SideMenuComponent,
    QuizComponent
  ],
  imports: [
    CommonModule,
    PagesRoutingModule,
    RouterModule,
    MatToolbarModule,
    ReactiveFormsModule   
  ]
})
export class PagesModule { }
