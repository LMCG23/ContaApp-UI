import { Injectable } from '@angular/core';
import Swal, { SweetAlertResult } from 'sweetalert2';
@Injectable({
  providedIn: 'root'
})
export class MessageService {

  constructor() { }


  //Method to show an Error Message
  showError( message: string, title?: string ) {

    if ( !message || message.trim() === '' ) {
      return;
    }

    Swal.fire({
      title: title || 'Error',
      text: message,
      icon: 'error',
      confirmButtonColor: '#d33',
      confirmButtonText: 'Aceptar'
    });

  }

  //Method to show an Warning Message
  showWarning( message: string, title?: string ) {

    if ( !message || message.trim() === '' ) {
      return;
    }

    Swal.fire({
      title: title || 'Warning',
      text: message,
      icon: 'warning',
      confirmButtonColor: '#d33',
      confirmButtonText: 'Aceptar'
    });

  }

  showAlertQuestion( title: string, question: string ): Promise<SweetAlertResult> {

    return Swal.fire({
      title: title,
      text: question,
      icon: 'warning',
      showCancelButton: true,
      cancelButtonText: 'Cancelar',
      confirmButtonColor: '#d33',
      confirmButtonText: 'Aceptar'
    });

  }

}
