import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login.component';

import { PoPageLoginModule } from '@po-ui/ng-templates';

@NgModule({
  declarations: [LoginComponent],
  imports: [
    CommonModule,
    PoPageLoginModule
  ],
  exports: [LoginComponent]
})
export class LoginModule { }
