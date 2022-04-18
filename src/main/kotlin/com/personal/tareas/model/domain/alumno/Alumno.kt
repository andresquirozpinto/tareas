package com.personal.tareas.model.domain.alumno

import java.time.Instant
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
    val createdAt = Instant.now()
    var updatedAt: Instant? = null

    @PreUpdate
    fun preUpdate(){
        updatedAt = Instant.now()
    }
}