import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ClubDetailsComponent } from './components/club-details/club-details.component';
import { ClubListComponent } from './components/club-list/club-list.component';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild([
      { path: 'club-list', component: ClubListComponent },
      { path: '', redirectTo: 'club-list', pathMatch: 'full' },
      { path: 'club-details', component: ClubDetailsComponent }
    ])
  ]
})
export class ClubManagementModule { }
