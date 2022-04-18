package com.personal.tareas.model.service

import com.personal.tareas.model.domain.alumno.Alumno
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.stereotype.Service
import org.springframework.transaction.annotation.Transactional
import javax.persistence.EntityManager

@Service
class AlumnoService (@Autowired private val entityManager: EntityManager){

    @Transactional(rollbackFor = [Exception::class])
    fun createAlumno (
        nombre:String,
        rut:String
    ):Alumno{
        val alumno = Alumno(nombre, rut)
        entityManager.persist(alumno)
        return alumno
    }

    fun listar():List<Alumno>{
        var hql = "select distinct(a) from Alumno a"
        val query = entityManager.createQuery(hql, Alumno::class.java)
        return query.resultList
    }
}