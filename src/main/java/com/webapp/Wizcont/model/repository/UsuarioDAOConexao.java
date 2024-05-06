package com.webapp.Wizcont.model.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.webapp.Wizcont.model.UsuarioDAO;

@Repository
public interface UsuarioDAOConexao extends JpaRepository<UsuarioDAO, String>{
    @SuppressWarnings({ "null", "unchecked" })
    UsuarioDAO save(UsuarioDAO user);
    UsuarioDAO findByEmail(String email_usuario);
}
