import { Component, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';


@Component({
  selector: 'app-confirm',
  templateUrl: './confirm.component.html',
  styleUrls: ['./confirm.component.scss']
})
  export class ConfirmComponent implements OnInit {
    isCorrect = false;

    constructor(public bsModalRef: BsModalRef) {}

    ngOnInit(): void {
      setTimeout(() => {
        this.bsModalRef.hide();
      }, 1000);
    }


}
