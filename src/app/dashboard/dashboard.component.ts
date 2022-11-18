import { Component, AfterViewInit, Inject } from '@angular/core';
import { MessageService } from '../shared/message/message.service';
import Swal from 'sweetalert2';
import { EventTypes } from '../shared/models/Enums/EventTypes';
import { ToastService } from '../shared/toastService/toast.service';
//declare var require: any;

@Component({
  templateUrl: './dashboard.component.html'
})
export class DashboardComponent implements AfterViewInit {
  subtitle: string;
  constructor(@Inject(MessageService) private messageService:MessageService,@Inject(ToastService) private toastService: ToastService) {
    this.subtitle = 'This is some text within a card block.';
  }

  EventTypes = EventTypes;

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

  // Examples how to use toast
  showToast(type: EventTypes) {
    switch (type) {
      case EventTypes.Success:
        this.toastService.showSuccessToast('Success toast title', 'This is a success toast message.');
        break;
      case EventTypes.Warning:
        this.toastService.showWarningToast('Warning toast title', 'This is a warning toast message.');
        break;
      case EventTypes.Error:
        this.toastService.showErrorToast('Error toast title', 'This is an error toast message.');
        break;
      default:
        this.toastService.showInfoToast('Info toast title', 'This is an info toast message.');
        break;
    }
  }
    // Examples how to use toast

}
