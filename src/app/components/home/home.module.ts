import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PoModule } from '@po-ui/ng-components';
import { HomeComponent } from './home.component';
import { CameraService } from '../../services/camera.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SamplePoMultiselectHeroesService } from './services/po-sample-heroes.service';



@NgModule({
  declarations: [HomeComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    PoModule
  ],
  providers: [CameraService, SamplePoMultiselectHeroesService]
})
export class HomeModule { }
