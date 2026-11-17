import { Routes } from '@angular/router';
import { AccessoiresComponent } from './accessoires/accessoires.component';
import { AddAccessoireComponent } from './add-accessoire/add-accessoire.component';
import { UpdateAccessoireComponent } from './update-accessoire/update-accessoire.component';
import { RechercheParMarqueComponent } from './recherche-par-marque/recherche-par-marque.component';
import { RechercheParNomComponent } from './recherche-par-nom/recherche-par-nom.component';
import { ListeMarquesComponent } from './liste-marques/liste-marques.component';
import { LoginComponent } from './login/login.component';
import { ForbiddenComponent } from './forbidden/forbidden.component';
import { adminGuard, authGuard } from './guards/auth.guard';

export const routes: Routes = [
  { path: "login", component: LoginComponent },
  { path: "app-forbidden", component: ForbiddenComponent },
  { path: "accessoires", component: AccessoiresComponent, canActivate: [authGuard] },
  { path: "add-accessoire", component: AddAccessoireComponent, canActivate: [adminGuard] },
  { path: "updateAccessoire/:id", component: UpdateAccessoireComponent, canActivate: [adminGuard] },
  { path: "rechercheParMarque", component: RechercheParMarqueComponent, canActivate: [authGuard] },
  { path: "rechercheParNom", component: RechercheParNomComponent, canActivate: [authGuard] },
  { path: "listeMarques", component: ListeMarquesComponent, canActivate: [adminGuard] },
  { path: "", redirectTo: "accessoires", pathMatch: "full" }
];
