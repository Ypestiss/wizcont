package com.webapp.Wizcont.model;

import java.util.List;

import org.hibernate.annotations.DynamicUpdate;
import org.hibernate.annotations.GenericGenerator;

import com.webapp.Wizcont.model.enums.StatusCategoria;
import com.webapp.Wizcont.model.enums.StatusMedida;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
@DynamicUpdate
public class BancoDAO {
    @Id
    @GenericGenerator(name="geradorItensID", strategy= "com.webapp.Wizcont.model.GeneratorItemId")
    @GeneratedValue(generator = "geradorItensID")
    private String id_Item;
    @Column(nullable = false)
    private String id_user;
    @Column(nullable = false)
    private String nome_item;
    @Column(nullable = false)
    private Integer qtd_item;
    @Column(nullable = false)
    @Enumerated(EnumType.STRING)
    private StatusMedida medida;
    @Column(nullable = false)
    @Enumerated(EnumType.STRING)
    private StatusCategoria categoria;

    public BancoDAO(){
        super();
    }
    
    @Override
    public String toString() {
        return "Item{" +
                "idItem='" + id_Item + '\'' +
                "iduser='" + id_user + '\'' +
                ", nome_item='" + nome_item + '\'' +
                ", quantidade_item=" + qtd_item + '\'' +
                ", categoria='" + categoria + '\'' +
                ", medida_item='" + medida +
                '}';
    }
    public BancoDAO(String id_Item, String id_user, String nome_item, Integer qtd_item, StatusCategoria categoria, StatusMedida medida){
        this.id_Item = id_Item;
        this.id_user = id_user;
        this.nome_item = nome_item;
        this.qtd_item = qtd_item;
        this.categoria = categoria;
        this.medida = medida;
    }

    public String getId_user(){
        return id_user;
    }
    public String getNome_item(){
        return nome_item;
    }
    public Integer getQtd_item(){
        return qtd_item;
    }
    public StatusCategoria getCategoria(){
        return categoria;
    }
    public void setId_user(String id_user){
        this.id_user = id_user;
    }
    public void setNome_item(String nome_item){
        this.nome_item = nome_item;
    }
    public void setQtd_item(Integer qtd_item){
        this.qtd_item = qtd_item;
    }
    public void setCategoria(StatusCategoria categoria){
        this.categoria = categoria;
    }
    public StatusMedida getMedida() {
        return medida;
    }
    public void setMedida(StatusMedida medida) {
        this.medida = medida;
    }
    public String getId_Item() {
        return id_Item;
    }

    public void setId_Item(String id_Item) {
        this.id_Item = id_Item;
    } 

}
