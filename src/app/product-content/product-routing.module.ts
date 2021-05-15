import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotFoundComponent } from '../core/components/not-found/not-found.component';
import { PdpResolver } from '../resolver/pdp.resolver';
import { ProductsResolver } from '../resolver/products.resolver';
import { GridPageComponent } from './pages/grid-page/grid-page.component';
import { PdpComponent } from './pages/pdp/pdp.component';

const routes: Routes = [
  {
    path: 'search/cat/:category',
    component: GridPageComponent,
    resolve: {
      productList: ProductsResolver,
    },
  },
  {
    path: 'search/:productId',
    component: PdpComponent,
    resolve: {
      products: PdpResolver,
    },
  },
  {
    path: 'not-found',
    component: NotFoundComponent,
  },
  { path: '**', component: NotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProductRoutingModule {}
