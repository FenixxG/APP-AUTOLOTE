import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
const MySwal = withReactContent(Swal);

const swalWithBootstrapButtons = MySwal.mixin({
    customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger'
    },
    buttonsStyling: false
});

export function mostrarAlerta(mensaje, icono, foco) {

    MySwal.fire({
        title: mensaje,
        icon: icono, // Iconos: success, error, warning, info, question
        confirmButtonText: 'Aceptar',
        customClass: {
            confirmButton: 'btn-primary' // Clases de bootstrap: btn-success, btn-danger, btn-warning, btn-info, btn-question
        },
    });
}

export function mostrarAlertaOk(mensaje, icono) {
    MySwal.fire({
        title: mensaje,
        icon: 'success',
        confirmButtonText: 'Aceptar',
        showConfirmButton: false,
        timer: 1500
    });
}

export function mostrarAlertaPregunta(accion, mensaje) {
    MySwal.fire({
        title: mensaje,
        icon: 'question',
        confirmButtonText: 'Confirmar',
        showConfirmButton: true,
        cancelButtonText: 'Cancelar',
        showCancelButton: true,
    }).then((result) => {
        if (result.isConfirmed) {
            accion(true);
        } else if (result.isDismissed) {
            accion(false);
        }
    })
}

export function mostrarAlertaError(mensaje) {
    MySwal.fire({
        title: mensaje,
        icon: 'error',
        confirmButtonText: 'Aceptar',
        showConfirmButton: false,
        timer: 3000
    });
}

export function mostrarAlertaWarning(mensaje) {
    MySwal.fire({
        title: mensaje,
        icon: 'warning',
        confirmButtonText: 'Aceptar',
        showConfirmButton: false,
        timer: 3000
    });
}

export function mostrarAlertaModificar(titulo, mensaje) {
    swalWithBootstrapButtons.fire({
        title: titulo,
        text: mensaje,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Modificar',
        cancelButtonText: 'Cancelar',
        reverseButtons: true
    }).then((result) => {
        if (result.isConfirmed) {
            swalWithBootstrapButtons.fire(
                'Modificado!',
                'El registro ha sido modificado.',
                'success'
            )
        } else if (result.isDismissed === Swal.DismissReason.cancel) {
            swalWithBootstrapButtons.fire(
                'Cancelado',
                'El registro no ha sido modificado.',
                'error'
            )
        }
    });
}

function onfocus(foco) {
    if (foco !== '') {
        document.getElementById(foco).focus();
    }
}