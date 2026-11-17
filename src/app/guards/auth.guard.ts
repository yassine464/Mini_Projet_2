import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

// Il faut être connecté
export const authGuard: CanActivateFn = () => {
  const authService = inject(AuthService);
  const router = inject(Router);
  if (authService.isloggedIn) return true;
  router.navigate(['/login']);
  return false;
};

// Il faut être connecté ET avoir le rôle ADMIN
export const adminGuard: CanActivateFn = () => {
  const authService = inject(AuthService);
  const router = inject(Router);
  if (!authService.isloggedIn) {
    router.navigate(['/login']);
    return false;
  }
  if (authService.isAdmin()) return true;
  router.navigate(['app-forbidden']);
  return false;
};
