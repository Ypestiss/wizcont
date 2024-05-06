package com.webapp.Wizcont.model;

import java.util.Collection;
import java.util.List;

import org.hibernate.annotations.DynamicUpdate;
import org.hibernate.annotations.GenericGenerator;

import com.webapp.Wizcont.model.enums.StatusUser;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;

@Entity
@DynamicUpdate
public class UsuarioDAO{
    
    @Id
    @GenericGenerator(name="geradorID", strategy= "com.webapp.Wizcont.model.GeneratorId")
    @GeneratedValue(generator = "geradorID")
    private String id_user;
    @Column(nullable = false)
    private String nome_usuario;
    @Column(nullable = false)
    private String senha;
    @Column(nullable = false)
    private String email;
    @Column(nullable = false)
    @Enumerated(EnumType.STRING)
    private StatusUser atividade;


    public UsuarioDAO(){
        super();
    }

    @Override
    public String toString() {
        return "Perfil{" +
                "iduser='" + id_user + '\'' +
                ", nome_usuario='" + nome_usuario + '\'' +
                ", senha=" + senha + '\'' +
                ", email='" + email + '\'' +
                ", atividade='" + atividade + '\'' +
                '}';
    }


    public UsuarioDAO(String id_user, String nome_usuario, String senha, String email, StatusUser atividade) {
        super();
        this.id_user = id_user;
        this.nome_usuario = nome_usuario;
        this.senha = senha;
        this.email = email;
        this.atividade = atividade;
    }
    public String getId_user() {
        return id_user;
    }
    public void setId_user(String id_user) {
        this.id_user = id_user;
    }
    public String getNome_usuario() {
        return nome_usuario;
    }
    public void setNome_usuario(String nome_usuario) {
        this.nome_usuario = nome_usuario;
    }
    public String getSenha() {
        return senha;
    }
    public void setSenha(String senha) {
        this.senha = senha;
    }
    public String getEmail() {
        return email;
    }
    public void setEmail(String email) {
        this.email = email;
    }
    public StatusUser getStatus() {
        return atividade;
    }
    public void setStatus(StatusUser atividade) {
        this.atividade = atividade;
    }

}
