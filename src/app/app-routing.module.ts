import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AboutComponent } from './components/about/about.component';
import { HomeComponent } from './components/home/home.component';
import { TiendasComponent } from './components/tiendas/tiendas.component';
import { ProductosComponent } from './components/productos/productos.component';
import { VentasComponent } from './components/ventas/ventas.component';

const routes: Routes = [
  { path: '',   redirectTo: '/home', pathMatch: 'full' },
  { path: "about", component : AboutComponent},
  { path: "home", component : HomeComponent},
  { path: "tiendas", component : TiendasComponent},
  { path: "productos", component : ProductosComponent},
  { path: "ventas", component : VentasComponent},
];

@NgModule({
  imports: 
    [
      RouterModule.forRoot(routes)
    ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
