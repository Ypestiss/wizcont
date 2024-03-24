package model;

public class BancoDAO {
    private String id_user;
    private String nome_item;
    private Integer qtd_item;
    // private String medida_item;
    private String categoria_item;

    public BancoDAO(){
        super();
    }
    @Override
    public String toString() {
        return "Item{" +
                "iduser='" + id_user + '\'' +
                ", nome_item='" + nome_item + '\'' +
                ", quantidade_item=" + qtd_item +
                ", categoria_item='" + categoria_item + '\'' +
                '}';
    }
    public BancoDAO(String id_user, String nome_item, Integer qtd_item, String categoria_item){
        this.id_user = id_user;
        this.nome_item = nome_item;
        this.qtd_item = qtd_item;
        this.categoria_item = categoria_item;
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
    public String getCategoria_item(){
        return categoria_item;
    }
    // public String getMedida_item() {
    //     return medida_item;
    // }
    // public void setMedida_item(String medida_item) {
    //     this.medida_item = medida_item;
    // }
    public void setId_user(String id_user){
        this.id_user = id_user;
    }
    public void setNome_item(String nome_item){
        this.nome_item = nome_item;
    }
    public void setQtd_item(Integer qtd_item){
        this.qtd_item = qtd_item;
    }
    public void setCategoria_item(String categoria_item){
        this.categoria_item = categoria_item;
    }

}
