import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { MiniCartComponent } from './components/mini-cart/mini-cart.component';
import { HomeComponent } from './pages/home/home.component';
import { SharedModule } from '../shared/shared.module';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    NotFoundComponent,
    MiniCartComponent,
    HomeComponent,
  ],
  imports: [CommonModule, RouterModule, SharedModule, FormsModule],
  exports: [
    HeaderComponent,
    FooterComponent,
    NotFoundComponent,
    MiniCartComponent,
    HomeComponent,
  ],
  providers: [],
})
export class CoreModule {}
