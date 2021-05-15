import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotFoundComponent } from '../core/components/not-found/not-found.component';
import { AuthGuardService } from '../core/guards/auth-guard.service';
import { CartComponent } from './pages/cart/cart.component';
import { DeliveryAddressComponent } from './pages/delivery-address/delivery-address.component';

const routes: Routes = [
  { path: '', component: CartComponent, canActivate: [AuthGuardService] },
  {
    path: 'checkout',
    component: DeliveryAddressComponent,
    canActivate: [AuthGuardService],
  },
  { path: '**', component: NotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CheckoutFlowRoutingModule {}
