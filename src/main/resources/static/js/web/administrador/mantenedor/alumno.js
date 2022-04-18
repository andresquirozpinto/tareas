var currentPage = currentPage ||  {};

currentPage.events = {
    CREATE_ITEM : "0",//lanzar modal
    ITEM_CREATED : "1",
    DELETE_ITEM : "2",
    UPDATE_ITEM : "3"
}

currentPage.ModalForm = (function ($){
    let modal
    let $btnCrear
    let $btnCerrar
    let $btnActualizar

    let initialized = false

    let init = function(){
        if(initialized) return
        modal = $("#modal-test")
        $btnCrear = $("#btn-crear")
        $btnCerrar = $("#btn-cerrar")
        $btnActualizar = $("#btn-update")

        $(currentPage)
            .on(currentPage.events.CREATE_ITEM,(event) => {_showCreate()})
            .on(currentPage.events.UPDATE_ITEM,(event,id) => {_showUpdate(id)})

        $btnCerrar.click(function (){
            modal.hide()
        })

        initialized = true
    }

    let _showCreate = function (){
        modal.show()
        $btnCrear.click(function (){
            _doCreate()
        })
    }

    let _doCreate = function (){

        let nombreAlumno = document.getElementById("nombre-alumno").value
        let rutAlumno = document.getElementById("rut-alumno").value

        let data = {nombre: nombreAlumno, rut: rutAlumno}
        console.log(data)

        $.ajax({
            type: "POST",
            data: data
        }).done(function (response){
            console.log(response)
            alert("Agregado correctamente")
            $(currentPage).trigger(currentPage.events.ITEM_CREATED)
            modal.hide()
        })
    }

    let _showUpdate = function (id){
        modal.show()
        $btnActualizar.click(function (id){
            console.log(id)
            /*let nombreAlumno = document.getElementById("nombre-alumno").value
            let rutAlumno = document.getElementById("rut-alumno").value

            let data = {nombre: nombreAlumno, rut: rutAlumno}
            console.log(data)

            $.ajax({
                type: "PUT",
                data: data
            }).done(function (response){
                console.log(response)
                alert("Agregado correctamente")
                $(currentPage).trigger(currentPage.events.ITEM_CREATED)
                modal.hide()
            })*/
        })
    }

    return{
        init : init
    }

})(jQuery);

currentPage.Main = function ($){
    let tblAlumnos
    //let tblAlumnosPrefix = "tbl_mantenedor_"
    let $btnTest
    let modal

    let init = function (){

        $btnTest = $("#test")
        modal = $("#modal-test")

        let tmplBotones = $('#tbl-alumnos-actions').html();

        tblAlumnos = $("#tbl-alumnos").DataTable({
        })



        $btnTest.click(function (){
            //modal.show()
            $(currentPage).trigger(currentPage.events.CREATE_ITEM)
        })

        $(currentPage).on(currentPage.events.ITEM_CREATED,(event) => {_load()})
        $(currentPage).on(currentPage.events.DELETE_ITEM,(event) => {_load()})

        //_initListeners()
        _load()
    }


    let _load = function (){
        $.ajax({
            type: "GET",
            url: "list"
        }).done(function (listaItems){
            console.log(listaItems)

            listaItems.forEach((alumno)=>{
                console.log(alumno.nombre)

                //formato fecha moment.js
                alumno.createdAt = moment(alumno.createdAt).format("dddd, D [de] MMMM [de] YYYY [a las] H:mm")

                if (alumno.updatedAt==null){

                    alumno.updatedAt = "Sin actualizar"

                    let body = ''
                    for (let i=0; i<listaItems.length; i++){

                        let botonActualizar = '<a href="#" onclick="actualizarAlumno('+listaItems[i].id+')" class="btn btn-success btn-sm">Actualizar</a>'
                        let botonEliminar = '<a href="#" onclick="eliminarAlumno('+listaItems[i].id+')" class="btn btn-danger btn-sm">Eliminar</a>'

                        body += '<tr>' +
                            '<td>'+listaItems[i].id+'</td>' +
                            '<td>'+listaItems[i].nombre+'</td>' +
                            '<td>'+listaItems[i].rut+'</td>' +
                            '<td>'+listaItems[i].createdAt+'</td>' +
                            '<td>'+listaItems[i].updatedAt+'</td>' +
                            '<td>'+botonEliminar+'</td>'+
                            '<td>'+botonActualizar+'</td>'+
                            '</tr>'
                    }
                    document.getElementById('data-alumnos').innerHTML = body

                }
            })
        })

    }

    /*let eliminarAlumno = function (id){
        alert(id)
    }*/
    return{
        init : init
    }
}(jQuery);

/**
 *
 * CAPTURAR ID CON BOTON SEGUN CORRESPONDA
 */
function eliminarAlumno(id){
    console.log(id)
    $.ajax({
        type: "DELETE",
        data: {id : id}
    }).done(function (response){
        $(currentPage).trigger(currentPage.events.DELETE_ITEM)
    })
}

function actualizarAlumno(id){
    console.log(id)
    $(currentPage).trigger(currentPage.events.UPDATE_ITEM,id)
    /*$.ajax({
        type: "DELETE",
        data: {id : id}
    }).done(function (response){
        $(currentPage).trigger(currentPage.events.DELETE_ITEM)
    })*/
}

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

$(document).ready(function() {
    currentPage.ModalForm.init()
    currentPage.Main.init()

});