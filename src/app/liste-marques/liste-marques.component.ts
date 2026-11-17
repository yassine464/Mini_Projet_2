import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Marque } from '../model/marque.model';
import { AccessoireService } from '../services/accessoire.service';
import { UpdateMarqueComponent } from '../update-marque/update-marque.component';

@Component({
  selector: 'app-liste-marques',
  standalone: true,
  imports: [CommonModule, UpdateMarqueComponent],
  templateUrl: './liste-marques.component.html',
  styles: ``
})
export class ListeMarquesComponent implements OnInit {
  marques!: Marque[];
  updatedMarque: Marque = { idMarque: 0, nomMarque: "", descriptionMarque: "" };
  ajout: boolean = true;

  constructor(private accessoireService: AccessoireService) { }

  ngOnInit(): void {
    this.chargerMarques();
  }

  chargerMarques() {
    this.marques = this.accessoireService.listeMarques();
  }

  marqueUpdated(m: Marque) {
    if (this.ajout)
      this.accessoireService.ajouterMarque(m);
    else
      this.accessoireService.updateMarque(m);
    this.chargerMarques();
    // revenir au mode ajout avec un formulaire vide
    this.updatedMarque = { idMarque: 0, nomMarque: "", descriptionMarque: "" };
    this.ajout = true;
  }

  updateMarque(m: Marque) {
    this.updatedMarque = { ...m }; // copie : la ligne ne change pas avant l'enregistrement
    this.ajout = false;
  }

  supprimerMarque(m: Marque) {
    if (confirm("Etes-vous sûr ?")) {
      if (!this.accessoireService.supprimerMarque(m))
        alert("Impossible : cette marque est utilisée par au moins un accessoire.");
      this.chargerMarques();
    }
  }
}
