package com.personal.tareas.model.exception

open class TareasException(override val message:String? = null):Exception(message)
class NoUserException(override val message:String? = null): TareasException(message)
class UserNotAuthorizedException(override val message:String? = null): TareasException(message)
class ModelException(override val message:String): TareasException(message)
class ControllerException(override val message:String): TareasException(message)