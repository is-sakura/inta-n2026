  import { Injectable } from '@angular/core';
  import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
  import { ConfirmComponent } from './confirm/confirm.component';

  @Injectable({
    providedIn: 'root'
  })
  export class ConfirmService {
    constructor(private bsModalService: BsModalService) {}

    show(isCorrect: boolean): BsModalRef {
    const bsModalRef = this.bsModalService.show(ConfirmComponent);
    bsModalRef.content!.isCorrect = isCorrect;
    return bsModalRef;
  }
  }


