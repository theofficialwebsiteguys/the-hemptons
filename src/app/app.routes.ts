import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./features/home/home.component').then((m) => m.HomeComponent)
  },
  {
    path: 'shop',
    loadComponent: () => import('./features/shop/shop.component').then((m) => m.ShopComponent)
  },
  {
    path: 'products/:handle',
    loadComponent: () => import('./features/product/product.component').then((m) => m.ProductComponent)
  },
  {
    path: 'collections',
    loadComponent: () => import('./features/collections/collections.component').then((m) => m.CollectionsComponent)
  },
  {
    path: 'collections/:handle',
    loadComponent: () =>
      import('./features/collections/collection-detail.component').then((m) => m.CollectionDetailComponent)
  },
  {
    path: 'search',
    loadComponent: () => import('./features/search/search.component').then((m) => m.SearchComponent)
  },
  {
    path: 'about',
    loadComponent: () => import('./features/about/about.component').then((m) => m.AboutComponent)
  },
  {
    path: 'contact',
    loadComponent: () => import('./features/contact/contact.component').then((m) => m.ContactComponent)
  },
  {
    path: 'faq',
    loadComponent: () => import('./features/faq/faq.component').then((m) => m.FaqComponent)
  },
  {
    path: 'shipping',
    loadComponent: () => import('./features/shipping/shipping.component').then((m) => m.ShippingComponent)
  },
  {
    path: 'returns',
    loadComponent: () => import('./features/returns/returns.component').then((m) => m.ReturnsComponent)
  },
  {
    path: 'privacy',
    loadComponent: () => import('./features/privacy/privacy.component').then((m) => m.PrivacyComponent)
  },
  {
    path: 'terms',
    loadComponent: () => import('./features/terms/terms.component').then((m) => m.TermsComponent)
  },
  {
    path: 'account',
    loadComponent: () => import('./features/account/account.component').then((m) => m.AccountComponent)
  },
  {
    path: '**',
    loadComponent: () => import('./features/not-found/not-found.component').then((m) => m.NotFoundComponent)
  }
];
