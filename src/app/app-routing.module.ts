import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './core/pages/home/home.component';
import { NotFoundComponent } from './core/components/not-found/not-found.component';
import { CategoryCarouselResolver } from './shared/resolvers/category-carousel.resolver';

const routes: Routes = [
  {
    path: 'login',
    loadChildren: () => import('./user/user.module').then((m) => m.UserModule),
    pathMatch: 'full',
  },
  {
    path: 'product',
    loadChildren: () =>
      import('./product-content/product-content.module').then(
        (m) => m.ProductContentModule
      ),
  },
  {
    path: 'cart',
    loadChildren: () =>
      import('./checkout-flow/checkout-flow.module').then(
        (m) => m.CheckoutFlowModule
      ),
  },
  {
    path: 'not-found',
    component: NotFoundComponent,
    pathMatch: 'full',
  },
  {
    path: '',
    component: HomeComponent,
    pathMatch: 'full',
    resolve: { categoryList: CategoryCarouselResolver },
  },
  { path: '*', component: HomeComponent },
  { path: '**', component: NotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
