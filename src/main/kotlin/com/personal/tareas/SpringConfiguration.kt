package com.personal.tareas

import com.fasterxml.jackson.annotation.JsonInclude
import com.fasterxml.jackson.databind.ObjectMapper
import com.fasterxml.jackson.datatype.hibernate5.Hibernate5Module
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule
import com.fasterxml.jackson.module.kotlin.KotlinModule
import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer

@Configuration
class SpringConfiguration: WebMvcConfigurer {

    @Bean
    fun jacksonObjectMapper(): ObjectMapper {
        val mapper = ObjectMapper()
        mapper.setSerializationInclusion(JsonInclude.Include.NON_NULL)
        mapper.registerModule(Hibernate5Module())
        mapper.registerModule(JavaTimeModule())
        mapper.registerModule(KotlinModule())

        return mapper
    }

}