import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PagesComponent } from './pages.component';
import { QuizComponent } from './quiz/quiz.component';
import { GetQuizComponent } from './get-quiz/get-quiz.component';


const routes: Routes = [
  {
    path: '',
    component: PagesComponent,
    children: [
      {
        path: 'hoge',
        loadChildren: () =>
          import('./hoge/hoge.module').then((m) => m.HogeModule),
      },
      {
        path: 'fuga',
        loadChildren: () =>
          import('./fuga/fuga.module').then((m) => m.FugaModule),
      },
      {
        path: 'piyo',
        loadChildren: () =>
          import('./piyo/piyo.module').then((m) => m.PiyoModule),
      },
      {
        path: 'quiz',
        component: QuizComponent,
      },
      {
        path: 'get-quiz',
        component: GetQuizComponent,
      },
      {
        path: 'zukan',
        loadChildren: () =>
          import('./zukan/zukan.module').then((m) => m.ZukanModule),
      },
      {
          path: 'home',
          loadChildren: () =>
            import('./home/home.module').then((m) => m.HomeModule),
        },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }



