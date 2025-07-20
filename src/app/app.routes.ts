import { Routes } from '@angular/router';
import { HomeComponent } from './pages/container/home/home.component';
import { AboutComponent } from './pages/container/about/about.component';
import { BrandsComponent } from './pages/container/brands/brands.component';
import { CheckoutComponent } from './pages/container/checkout/checkout.component';
import { ProductsComponent } from './pages/container/products/products.component';
import { LoginComponent } from './pages/auth/login/login.component';
import { RegisterComponent } from './pages/auth/register/register.component';
import { AuthComponent } from './pages/auth/auth/auth.component';
import { ContainerComponent } from './pages/container/container/container.component';
import { NotFoundComponent } from './pages/container/not-found/not-found.component';
import { goToAuthGuard } from './core/guards/goToAuth/go-to-auth.guard';
import { goToHomeGuard } from './core/guards/goToHome/go-to-home.guard';

export const routes: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    {
        path: '',
        component: ContainerComponent,
        canActivate: [goToHomeGuard],
        children: [
            { path: 'home', component: HomeComponent, title: 'home' },
            { path: 'about', component: AboutComponent, title: 'about' },
            { path: 'brands', component: BrandsComponent, title: 'brands' },
            {
                path: 'cart',
                loadComponent: () =>
                    import('./pages/container/cart/cart.component').then(
                        (c) => c.CartComponent
                    ),
            },
            { path: 'checkout', component: CheckoutComponent, title: 'checkout' },
            { path: 'products', component: ProductsComponent, title: 'products' },
        ],
    },
    {
        path: '',
        component: AuthComponent,
        canActivate: [goToAuthGuard],
        children: [
            { path: 'login', component: LoginComponent, title: 'login' },
            { path: 'register', component: RegisterComponent, title: 'register' },
        ],
    },
    { path: '**', component: NotFoundComponent, title: 'NOT FOUND!!' },
];
