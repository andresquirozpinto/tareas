package com.personal.tareas.model.controller

import com.personal.tareas.model.domain.alumno.Alumno
import com.personal.tareas.model.service.AlumnoService
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.stereotype.Controller
import org.springframework.ui.Model
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.ResponseBody

@Controller
@RequestMapping("administrador/mantenedor/alumnos/")
class MantenedorAlumnoController(
    @Autowired private val alumnoService: AlumnoService
)
{
    @GetMapping
    fun render(model: Model):String{
        //createAlumno("Tamara","12345612-5")
        return "web/administrador/mantenedor/alumnos"
    }

    @GetMapping("list")
    @ResponseBody
    fun list():List<Alumno>{
        return alumnoService.listar()
    }

    @PostMapping
    @ResponseBody
    fun createAlumno(
        nombre:String,
        rut:String
    ):Alumno{
        return alumnoService.createAlumno(nombre, rut)
    }
}