import { NgModule } from '@angular/core';
import {MatCardModule} from '@angular/material/card';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatIconModule} from '@angular/material/icon';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatTableModule} from '@angular/material/table';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatRadioModule} from '@angular/material/radio';
import {MatListModule} from '@angular/material/list';
import {MatMenuModule} from '@angular/material/menu';
import {MatSelectModule} from '@angular/material/select';
import {MatTreeModule} from '@angular/material/tree';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatNativeDateModule} from '@angular/material/core'
import {MatDatepickerModule } from '@angular/material/datepicker';
import {MatButtonModule} from '@angular/material/button';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatTabsModule} from '@angular/material/tabs';

let Materials = [
    MatSidenavModule,
    MatIconModule,
    MatTabsModule,
    MatButtonModule,
    MatPaginatorModule,
    MatTreeModule,
    MatExpansionModule,
    MatCardModule,
    MatSlideToggleModule,
    MatCheckboxModule,
    MatNativeDateModule,
    MatMenuModule,
    MatListModule,
    MatFormFieldModule,
    MatToolbarModule,
    MatInputModule,
    MatDatepickerModule,
    MatTableModule,
    MatRadioModule,
    MatSelectModule,
];

@NgModule({
  declarations: [],
  imports: [
    Materials
  ],
  exports: [
    Materials
  ]
})
export class MatModule { }
