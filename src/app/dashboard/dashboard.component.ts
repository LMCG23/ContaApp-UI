import { Component, AfterViewInit, Inject } from '@angular/core';
import { MessageService } from '../shared/message/message.service';
import Swal from 'sweetalert2';
//declare var require: any;

@Component({
  templateUrl: './dashboard.component.html'
})
export class DashboardComponent implements AfterViewInit {
  subtitle: string;
  constructor(@Inject(MessageService) private messageService:MessageService) {
    this.subtitle = 'This is some text within a card block.';
  }

  ngAfterViewInit() { }

// Examples how to use the alerts
  showErrorAlert(){
    this.messageService.showError('Test Error');
  }
  showWarningAlert(){
    this.messageService.showWarning('Test Warning');

  }
  showQuestionAlert(){
    this.messageService.showAlertQuestion('Test Question','Do you want to save the changes?').then((result:any) =>{
        if(result.isConfirmed){
          Swal.fire('Saved!', '', 'success')
        } else if(result.isDenied){
          Swal.fire('Changes are not saved', '', 'info')
        }

    })

  }
  // Examples how to use the alerts
}
