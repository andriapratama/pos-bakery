import Swal, { SweetAlertPosition } from 'sweetalert2';

import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  public toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 3000,
    customClass: {
      popup: 'small-popup',
      title: 'small-title',
      icon: 'small-icon',
      htmlContainer: 'small-html',
    },
  });

  constructor() {}

  public error(message: string, title: string, position?: SweetAlertPosition) {
    this.toast.fire({
      icon: 'error',
      title,
      position: position || 'top-end',
      html: message,
      background: '#FFF2F0',
      color: '#ED2E45',
    });
  }

  public success(
    message: string,
    title: string,
    position: SweetAlertPosition = 'bottom',
  ) {
    this.toast.fire({
      icon: 'success',
      title,
      position,
      html: message,
    });
  }
}
