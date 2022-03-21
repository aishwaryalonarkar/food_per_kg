import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DefaultComponent } from './default.component';
import { MainComponent } from 'src/app/modules/main/main.component';
import { CartComponent } from 'src/app/modules/cart/cart.component';
import { CheckoutComponent } from 'src/app/modules/checkout/checkout.component';
import { HomeComponent } from 'src/app/modules/home/home.component';
// import {MenuHeaderComponent} from 'src/app/modules/menu-header/menu-header.component';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';

import { MatSidenavModule } from '@angular/material/sidenav';
import { MatCardModule } from '@angular/material/card';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatButtonModule } from '@angular/material/button';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { MatStepperModule } from '@angular/material/stepper';
import { MatListModule } from '@angular/material/list';
import {MatDividerModule} from '@angular/material/divider';
import {MatRadioModule} from '@angular/material/radio';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatChipsModule} from '@angular/material/chips';
import {MatTableModule} from '@angular/material/table';
import { MatCarouselModule } from '@ngmodule/material-carousel';
import {MatTreeModule} from '@angular/material/tree';
import {MatSelectModule} from '@angular/material/select';
// import { MatCarousel, MatCarouselComponent } from '@angular/material/material-carousel';

import { FlexLayoutModule } from '@angular/flex-layout';
import { MatIconModule } from '@angular/material/icon';
import {MatTabsModule} from '@angular/material/tabs';
// import {MatSnackBar} from '@angular/material/snack-bar';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule } from '@angular/material/input';
import { MenuHeaderComponent } from '../../modules/menu-header/menu-header.component';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { NotifierModule,NotifierOptions } from "angular-notifier";
import {NgxMaterialTimepickerModule} from 'ngx-material-timepicker';
import { HttpClientModule } from '@angular/common/http';


// import {MatNativeDateModule, MatMomentDateModule} from '@angular/material/input'

/**
 * Custom angular notifier options
 */
const customNotifierOptions: NotifierOptions = {
  position: {
		horizontal: {
			position: 'right',
			distance: 12
		},
		vertical: {
			position: 'top',
			distance: 12,
			gap: 10
		}
	},
  theme: 'material',
  behaviour: {
    autoHide: 3000,
    onClick: 'hide',
    onMouseover: 'pauseAutoHide',
    showDismissButton: true,
    stacking: 4
  },
  animations: {
    enabled: true,
    show: {
      preset: 'slide',
      speed: 300,
      easing: 'ease'
    },
    hide: {
      preset: 'fade',
      speed: 300,
      easing: 'ease',
      offset: 50
    },
    shift: {
      speed: 300,
      easing: 'ease'
    },
    overlap: 150
  }
};





@NgModule({
  declarations: [
    DefaultComponent,
    MainComponent,
    CartComponent,
    CheckoutComponent,
    HomeComponent,
    MenuHeaderComponent
    
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule,
    MatSidenavModule,
    MatCardModule,
    MatSlideToggleModule,
    MatButtonToggleModule,
    MatButtonModule,
    MatStepperModule,
    MatListModule,
    MatIconModule,
    MatDividerModule,
    MatRadioModule,
    MatGridListModule,
    MatTabsModule,
    MatChipsModule,
    MatTableModule,
    MatTreeModule,
    MatCarouselModule,
    MatSelectModule,
    MatInputModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatNativeDateModule,

    // MatNativeDateModule,
    // MatMomentDateModule,
    // MatSnackBar,
    ScrollingModule,
    FlexLayoutModule,
    
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NotifierModule.withConfig(customNotifierOptions),
    NgxMaterialTimepickerModule
    
  ],
  // providers:
  // [
  //   MatDatepickerModule,
  // ]
})
export class DefaultModule { }
