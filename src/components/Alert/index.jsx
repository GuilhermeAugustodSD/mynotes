import Swal from "sweetalert2"

export default function Confirma(){
    console.log('aaa')
    const Toast = Swal.mixin({
        toast: true,
        position: 'bottom-end',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,

        didOpen: (toast) => {
            toast.addEventListener('mouseenter', Swal.stopTimer)
            toast.addEventListener('mouseleave', Swal.resumeTimer)
        }
    })

    return (
        Toast.fire({
            iconColor: "white",
            icon: 'success',
            title: 'Usuario atualizado',
            background: '#a5dc86'
        })
    )
}
