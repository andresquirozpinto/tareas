$(document).ready(function() {
    let $btnTest
    $btnTest = $("#test")

    $btnTest.click(function (){
        alert("Levantando boton....")
    })

    cargarAlumnos()

    $("#tbl-alumnos").DataTable()

});


function cargarAlumnos(){

    let url = 'list'
    fetch(url)
        .then(response => response.json())
        .then(alumnos => mostrarData(alumnos))
        .catch(error => console.log(error))

    const mostrarData = (alumnos) => {
        console.log(alumnos)
        /**
         * 1 FORMA DE IR DIBUJANDO LOS DATOS DEL CONTROLLER (LIST)
         */
        /*let listadoHtml = ''
        for (let usuario of usuarios){
            let usuarioHtml =
                '<tr>' +
                '<td>'+usuario.id+'</td>' +
                '<td>'+usuario.nombre+' '+usuario.apellido+'</td>' +
                '<td>'+usuario.email+'</td>' +
                '<td>'+usuario.telefono+'</td>' +
                '</tr>'
            listadoHtml += usuarioHtml
        }
        document.querySelector('#tblusuarios tbody').outerHTML = listadoHtml*/
        /**
         * 2 FORMA DE IR DIBUJANDO LOS DATOS DEL CONTROLLER (LIST)
         */
        let body = ''
        for (let i=0; i<alumnos.length; i++){
            body += '<tr>' +
                '<td>'+alumnos[i].id+'</td>' +
                '<td>'+alumnos[i].nombre+'</td>' +
                '<td>'+alumnos[i].rut+'</td>' +
                '<td><a href="#" class="btn btn-danger btn-circle btn-sm"><i class="fas fa-trash"></i></a></td>'+
                '</tr>'
        }
        //ID EN EL TBODY
        document.getElementById('data-alumnos').innerHTML = body
    }

}