import Swal, {SweetAlertType} from 'sweetalert2';

export class SweetAlert2 {
  public static showModalSweetAlert(title: string, text: string, type: SweetAlertType) {
    Swal({
      title: title,
      text: text,
      type: type
    });
  }
}
