import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FinishComponent } from './finish/finish.component';
import { QeustionsComponent } from './qeustions/qeustions.component';
import { TestComponent } from './test/test.component';

const routes: Routes = [
  { path: '', redirectTo: '/test', pathMatch: 'full' },
  { path: 'test', component: TestComponent },
  { path: 'test/:tid/:qid', component: QeustionsComponent },
  { path: 'finish/:fid', component: FinishComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
