import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-status',
  templateUrl: './status.component.html',
  styleUrls: ['./status.component.less']
})
export class StatusComponent implements OnInit {

  @ViewChild('savingModal') savingModal: ElementRef;

  public message: string = "placeholder - should not show";
  public isStatusBarVisible: boolean = false;
  public statusTypeClass: string = "";
  private statusBarDisplayTime: number = 10000; // TODO: Get from config

  constructor(private modalService: NgbModal) { }

  ngOnInit(): void {
  }

  showSaving():void{
    this.modalService.open(this.savingModal, {
      ariaLabelledBy: 'modal-basic-title',
      backdrop: 'static',
      keyboard: false
    });
  }

  hideSaving():void{
    this.modalService.dismissAll();
  }

  setSavingSuccess():void {
    this.message = "Saving successful";
    this.statusTypeClass = "success";
    this.showStatusBar();
  }

  setSavingError():void {
    this.message = "Error while saving";
    this.statusTypeClass = "error";
  }

  private showStatusBar():void {
    this.isStatusBarVisible = true;

    setTimeout(()=>{
      this.isStatusBarVisible = false;
    }, this.statusBarDisplayTime);
  
  }
}
