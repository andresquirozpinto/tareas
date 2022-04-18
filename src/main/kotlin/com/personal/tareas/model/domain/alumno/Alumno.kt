package com.personal.tareas.model.domain.alumno

import java.time.LocalDateTime
import javax.persistence.*

@Entity
class Alumno(
    var nombre:String,
    var rut:String
)
{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    var id:Long? = null
    val createdAt = LocalDateTime.now()
    var updatedAt: LocalDateTime? = null

    @PreUpdate
    fun preUpdate(){
        updatedAt = LocalDateTime.now()
    }
}