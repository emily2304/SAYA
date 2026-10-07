
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Component, Input } from '@angular/core';

@Component({
  standalone: true,
  template: `
    <div class="modal-header">
      <h4 class="modal-title">{{title}}</h4>
    </div>
    <div class="modal-body">
      <p>{{message}}</p>
    </div>
    <div class="modal-footer">
      <button type="button" class="btn btn-outline-secondary" (click)="activeModal.dismiss()">Cancelar</button>
      <button type="button" class="btn btn-primary" (click)="activeModal.close('confirm')">Confirmar</button>
    </div>
  `,
  styles: [`
    .modal-header {
      border-bottom: 1px solid #dee2e6;
      padding: 1rem;
    }
    .modal-body {
      padding: 1rem;
    }
    .modal-footer {
      border-top: 1px solid #dee2e6;
      padding: 1rem;
      display: flex;
      justify-content: flex-end;
      gap: 0.5rem;
    }
  `]
})
export class ConfirmModalComponent {
  @Input() title: string = 'Confirmar acción';
  @Input() message: string = '¿Estás seguro?';

  constructor(public activeModal: NgbActiveModal) {}
}
