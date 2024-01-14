package model;

import javafx.beans.property.IntegerProperty;

public class UsuarioDAO {
  
    private String id_user;
    private String nome_usuario;
    private String senha_usuario;
    private String email_usuario;


    public UsuarioDAO(){
        super();
    }

    public UsuarioDAO(String id_user, String nome_usuario, String senha_usuario, String email_usuario) {
        super();
        this.id_user = id_user;
        this.nome_usuario = nome_usuario;
        this.senha_usuario = senha_usuario;
        this.email_usuario = email_usuario;
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
    public String getSenha_usuario() {
        return senha_usuario;
    }
    public void setSenha_usuario(String senha_usuario) {
        this.senha_usuario = senha_usuario;
    }
    public String getEmail_usuario() {
        return email_usuario;
    }
    public void setEmail_usuario(String email_usuario) {
        this.email_usuario = email_usuario;
    }

    
}
