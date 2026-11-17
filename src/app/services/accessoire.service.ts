import { Injectable } from '@angular/core';
import { Accessoire } from '../model/accessoire.model';
import { Marque } from '../model/marque.model';

@Injectable({
  providedIn: 'root'
})
export class AccessoireService {
  accessoires: Accessoire[];
  marques: Marque[];
  accessoire!: Accessoire;

  constructor() {
    this.marques = [
      { idMarque: 1, nomMarque: "Apple", descriptionMarque: "Marque américaine d'électronique grand public" },
      { idMarque: 2, nomMarque: "Samsung", descriptionMarque: "Marque sud-coréenne d'électronique" },
      { idMarque: 3, nomMarque: "Anker", descriptionMarque: "Marque spécialisée en chargeurs et batteries" }
    ];
    this.accessoires = [
      { idAccessoire: 1, nomAccessoire: "Casque Bluetooth", prixAccessoire: 120.500, dateCreation: new Date("01/14/2011"), marque: this.marques[1] },
      { idAccessoire: 2, nomAccessoire: "Coque iPhone", prixAccessoire: 25, dateCreation: new Date("12/17/2010"), marque: this.marques[0] },
      { idAccessoire: 3, nomAccessoire: "Chargeur USB-C", prixAccessoire: 45.123, dateCreation: new Date("02/20/2020"), marque: this.marques[2] }
    ];
  }

  // ===== Accessoires =====
  listeAccessoires(): Accessoire[] {
    return this.accessoires;
  }

  ajouterAccessoire(acc: Accessoire) {
    this.accessoires.push(acc);
  }

  supprimerAccessoire(acc: Accessoire) {
    const index = this.accessoires.indexOf(acc, 0);
    if (index > -1) {
      this.accessoires.splice(index, 1);
    }
  }

  consulterAccessoire(id: number): Accessoire {
    this.accessoire = this.accessoires.find(a => a.idAccessoire == id)!;
    return this.accessoire;
  }

  updateAccessoire(acc: Accessoire) {
    const index = this.accessoires.indexOf(acc, 0);
    if (index > -1) {
      this.accessoires.splice(index, 1);
      this.accessoires.splice(index, 0, acc);
    }
  }

  // ===== Recherche =====
  rechercherParMarque(idMarque: number): Accessoire[] {
    return this.accessoires.filter(a => a.marque?.idMarque == idMarque);
  }

  // ===== Marques (CRUD sur le tableau, sans API) =====
  listeMarques(): Marque[] {
    return this.marques;
  }

  consulterMarque(id: number): Marque {
    return this.marques.find(m => m.idMarque == id)!;
  }

  ajouterMarque(m: Marque) {
    // génère un nouvel id (max + 1)
    const maxId = this.marques.reduce((max, cur) => Math.max(max, cur.idMarque), 0);
    this.marques.push({ ...m, idMarque: maxId + 1 });
  }

  updateMarque(m: Marque) {
    const existante = this.marques.find(cur => cur.idMarque == m.idMarque);
    if (existante) {
      // on modifie l'objet existant : les accessoires qui le référencent sont mis à jour
      Object.assign(existante, m);
    }
  }

  supprimerMarque(m: Marque): boolean {
    // refus si au moins un accessoire utilise cette marque
    const utilisee = this.accessoires.some(a => a.marque?.idMarque == m.idMarque);
    if (utilisee) return false;
    const index = this.marques.findIndex(cur => cur.idMarque == m.idMarque);
    if (index > -1) this.marques.splice(index, 1);
    return true;
  }
}
