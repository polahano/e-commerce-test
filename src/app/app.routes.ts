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
import { DetailsComponent } from './pages/container/details/details.component';
import { CartComponent } from './pages/container/cart/cart.component';
import { AllordersComponent } from './pages/container/allorders/allorders.component';
import { ForgotPassComponent } from './pages/auth/forgot-pass/forgot-pass.component';
import { WishlistComponent } from './pages/container/wishlist/wishlist.component';

export const routes: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    {
        path: '',
        component: ContainerComponent,
        canActivate: [goToHomeGuard],
        children: [
            { path: 'home', component: HomeComponent, title: 'Home' },
            { path: 'about', component: AboutComponent, title: 'About' },
            { path: 'brands', component: BrandsComponent, title: 'Brands' },
            { path: 'cart', component: CartComponent, title: 'Cart' },
            { path: 'checkout', component: CheckoutComponent, title: 'Checkout' },
            { path: 'products', component: ProductsComponent, title: 'Products' },
            { path: 'details/:id', component: DetailsComponent, title: 'Details' },
            { path: 'allorders', component: AllordersComponent, title: 'Orders' },
            { path: 'wishlist', component: WishlistComponent, title: 'Wishlist' },
        ],
    },
    {
        path: '',
        component: AuthComponent,
        canActivate: [goToAuthGuard],
        children: [
            { path: 'login', component: LoginComponent, title: 'Login' },
            { path: 'register', component: RegisterComponent, title: 'Register' },
            { path: 'forgot-password', component: ForgotPassComponent, title: 'Forgot Password' },
        ],
    },
    { path: '**', component: NotFoundComponent, title: 'NOT FOUND!!' },
];
