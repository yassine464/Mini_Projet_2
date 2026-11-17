import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Marque } from '../model/marque.model';

@Component({
  selector: 'app-update-marque',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './update-marque.component.html',
  styles: ``
})
export class UpdateMarqueComponent {
  @Input()
  marque!: Marque;

  @Input()
  ajout!: boolean;

  @Output()
  marqueUpdated = new EventEmitter<Marque>();

  saveMarque() {
    this.marqueUpdated.emit(this.marque);
  }
}
