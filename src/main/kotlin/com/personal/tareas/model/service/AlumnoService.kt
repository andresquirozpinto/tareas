package com.personal.tareas.model.service

import com.personal.tareas.model.domain.alumno.Alumno
import com.personal.tareas.model.exception.ModelException
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.dao.DataIntegrityViolationException
import org.springframework.stereotype.Service
import org.springframework.transaction.annotation.Propagation
import org.springframework.transaction.annotation.Transactional
import javax.persistence.EntityManager
import javax.persistence.PersistenceException

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

    @Transactional(rollbackFor = [Exception::class])
    fun updateAlumno (
        id:Long,
        nombre:String,
        rut:String
    ):Alumno{
        val alumno = entityManager.find(Alumno::class.java,id)
        alumno.nombre = nombre
        alumno.rut = rut
        return alumno
    }

    fun listar():List<Alumno>{
        var hql = "select distinct(a) from Alumno a"
        val query = entityManager.createQuery(hql, Alumno::class.java)
        return query.resultList
    }

    /**
     * Primera forma para borrar registro
     */
    /*@Transactional(rollbackFor = [Exception::class])
    fun deleteAlumno(id:Long){
        try{
                entityManager.createQuery("DELETE FROM Alumno a WHERE a.id = :ID")
                    .setParameter("ID",id)
                    .executeUpdate()
                entityManager.flush()

        }catch (ex: DataIntegrityViolationException){
            throw ModelException("Datos asociados. No se puede eliminar.")
        }catch (ex: PersistenceException){
            throw ModelException("Datos asociados. No se puede eliminar.")
        }
    }*/
    @Transactional(rollbackFor = [Exception::class])
    fun deleteAlumno(id:Long){
        val alumno = entityManager.find(Alumno::class.java,id)
        entityManager.remove(alumno)
    }

}