package model;
import java.sql.*;
import java.util.ArrayList;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

public class ConexaoDAO {

    Connection conn;
    public Integer dados = 0;
    public Integer itens = 0;

    public Connection openDatabase() {
        Connection conn = null;

        try {
            // Carregando o driver JDBC
            Class.forName("com.mysql.cj.jdbc.Driver");

            // URL de conexão com o banco de dados
            String url = "jdbc:mysql://localhost:3306/";
            String dbName = "db_wizcont";
            String username = "root";
            String password = "admin";

            conn = DriverManager.getConnection("jdbc:mysql://localhost:3306/db_wizcont", username, password);

            // Criar tabelas se não existirem
            createTables(conn);

        } catch (Exception e) {
            e.printStackTrace();
        }

        return conn;
    }

    private void createDatabase(Connection conn, String dbName) {
        try {
            Statement stmt = conn.createStatement();
            String sql = "CREATE DATABASE IF NOT EXISTS " + dbName;
            stmt.executeUpdate(sql);
        } catch (SQLException e) {
            e.printStackTrace();
        }
    }

    private void createTables(Connection conn) {
        try {
            Statement stmt = conn.createStatement();

            // Tabela bancos_usuarios
            String sqlBancosUsuarios = "CREATE TABLE IF NOT EXISTS bancos_usuarios (" +
                    "id_user VARCHAR(45) NOT NULL," +
                    "nome_item VARCHAR(45)," +
                    "quantidade_item INT," +
                    "categoria_item VARCHAR(45)," +
                    "PRIMARY KEY (id_user)" +
                    ")";
            stmt.executeUpdate(sqlBancosUsuarios);

            // Tabela usuarios
            String sqlUsuarios = "CREATE TABLE IF NOT EXISTS usuarios (" +
                    "id VARCHAR(45) PRIMARY KEY NOT NULL UNIQUE," +
                    "nome_usuario VARCHAR(45)," +
                    "senha_usuario VARCHAR(45)," +
                    "email_usuario VARCHAR(45) UNIQUE" +
                    ")";
            stmt.executeUpdate(sqlUsuarios);

        } catch (SQLException e) {
            e.printStackTrace();
        }
    }

    public void closeDatabase(Connection connection, Statement statement) {
        try {
            if (statement != null) {
                statement.close();
            }
            if (connection != null) {
                connection.close();
            }
        } catch (SQLException e) {
            throw new RuntimeException("Erro ao fechar a conexão", e);
        }
    }

    public void closeDatabase(Connection connection, Statement statement, ResultSet resultSet) {
        try {
            if (resultSet != null) {
                resultSet.close();
            }
            closeDatabase(connection, statement);
        } catch (SQLException e) {
            throw new RuntimeException("Erro ao fechar a conexão", e);
        }
    }
    
    public void inserirRegistro(UsuarioDAO usuario){
        conn = openDatabase();
        String criar = "INSERT INTO usuarios (id, nome_usuario, senha_usuario, email_usuario) VALUES (?,?,?,?)";
        try{
            if(!dadosJaExistem(usuario)){
                System.out.println("Conectado: " + conn);
                PreparedStatement pstm = conn.prepareStatement(criar);
                pstm.setString(1, usuario.getId_user());
                pstm.setString(2, usuario.getNome_usuario());
                pstm.setString(3, usuario.getSenha_usuario());
                pstm.setString(4, usuario.getEmail_usuario());
                pstm.executeUpdate();
                dados = 1;
            }
            else{
                System.out.println("[!] - Erro: deu erro rapaziada");
                dados = 0;
            }
        } catch (Exception e) {
			System.out.println("[!] - Erro: " + e);
		}
    }
    
    public void salvarBanco(BancoDAO bancouser){
        conn = openDatabase();
        String sql = "INSERT INTO bancos_usuarios (id_user, nome_item, quantidade_item, categoria_item) VALUES (?,?,?,?)";
        String upsql = "UPDATE bancos_usuarios SET quantidade_item = ? WHERE nome_item = ? AND id_user = ? AND categoria_item = ? ";
            try{
                if(!itensJaExistem(bancouser)){
                    PreparedStatement pstm = conn.prepareStatement(sql);
                    pstm.setString(1, bancouser.getId_user());
                    pstm.setString(2, bancouser.getNome_item());
                    pstm.setInt(3, bancouser.getQtd_item());
                    pstm.setString(4, bancouser.getCategoria_item());
                    pstm.executeUpdate();
                    System.out.println("Itens salvos com sucesso!!");
                }else{
                    PreparedStatement pstm = conn.prepareStatement(upsql);
                    pstm.setInt(1, bancouser.getQtd_item());
                    pstm.setString(2, bancouser.getNome_item());
                    pstm.setString(3, bancouser.getId_user());
                    pstm.setString(4, bancouser.getCategoria_item());
                    pstm.executeUpdate();
                    System.out.println("Itens editados com sucesso!!");
                    itens =1;
                }
            }catch (SQLException e){
                System.out.println("[!] - Erro ao salvar dados do armazem: " + e);
            }    
    }

    public void deletarItem(BancoDAO bancouser){
        conn = openDatabase();
        String sql = "DELETE FROM bancos_usuarios WHERE nome_item = ? AND quantidade_item = ? AND id_user = ? AND categoria_item = ? ";
        try{
            PreparedStatement pstmt = conn.prepareStatement(sql);
            pstmt.setString(1, bancouser.getNome_item());
            pstmt.setInt(2, bancouser.getQtd_item());
            pstmt.setString(3, bancouser.getId_user());
            pstmt.setString(4, bancouser.getCategoria_item());
            pstmt.executeUpdate();
            
        }catch(SQLException e){
            System.out.println("[!] - Erro ao deletar item" + e);
        }
    }

    public void fazerLogin(UsuarioDAO usuario){
        try{
        String sql = "SELECT COUNT(*) FROM usuarios WHERE email_usuario = ? AND senha_usuario = ?";
            try{
                if(dadosJaExistem(usuario)){
                    System.out.println("[_/] - Encontrou conta");
                    Connection conn = openDatabase();
                    PreparedStatement pstm = conn.prepareStatement(sql);
                    pstm.setString(1, usuario.getEmail_usuario());
                    pstm.setString(2, usuario.getSenha_usuario());
                    ResultSet rs = pstm.executeQuery();
                    rs.next();
                    dados = 1;
                }else{
                    dados = 0;
                    System.out.println("[!] - Conta não encontrada");
                }
            }finally{
                System.out.println("[_/] - Logou na conta!!");
            }
        }catch (SQLException e){
            e.printStackTrace();
        }
    
    
    }

    public ArrayList<UsuarioDAO> listarPerfil(HttpServletRequest request){
        ArrayList<UsuarioDAO> usuario = new ArrayList<>();
        String ler = "SELECT * FROM usuarios WHERE id = ? OR email_usuario = ?";
        try{
            Connection conn = openDatabase();
            PreparedStatement pstm = conn.prepareStatement(ler);
            
            HttpSession session = request.getSession();
            String id_user = (String) session.getAttribute("user_id");
            String email_user = (String) session.getAttribute("user_email");
            
            pstm.setString(1, id_user);
            pstm.setString(2, email_user);
            ResultSet rs = pstm.executeQuery();
            while (rs.next()){
                String iduser = rs.getString(1);
                String nomeuser = rs.getString(2);
                String senhauser = rs.getString(3);
                String emailuser = rs.getString(4);
                usuario.add(new UsuarioDAO(iduser, nomeuser, senhauser, emailuser));
                session.setAttribute("user_id", iduser);
                System.out.println("Perfil do usuario: " + "\n" 
                    +iduser + "\n" + nomeuser+ "\n" + senhauser + "\n" + emailuser);
            }
            return usuario;
        } catch(Exception e) {
            System.out.println(e);
            return null;
        }
    }

    public ArrayList<BancoDAO> listarItems(HttpServletRequest request){
        ArrayList<BancoDAO> itens = new ArrayList<>();
        String sql = "SELECT * FROM bancos_usuarios WHERE id_user = ?";
        try{
            Connection conn = openDatabase();
            HttpSession session = request.getSession();
            String id_user = (String) session.getAttribute("user_id");
            PreparedStatement pstm = conn.prepareStatement(sql);
            pstm.setString(1, id_user);
            ResultSet rs = pstm.executeQuery();
            while(rs.next()){
                String iduser = rs.getString(1);
                String nome_item = rs.getString(2);
                Integer quantidade_item = rs.getInt(3);
                String categoria_item = rs.getString(4);
                itens.add(new BancoDAO(iduser, nome_item, quantidade_item, categoria_item));
                session.setAttribute("itens", itens);
            }
        } catch(Exception e) {
            System.out.println(e);
        }
        return itens;
    }

    public String getIdUsuario(HttpServletRequest request) {
        HttpSession session = request.getSession();
        return (String) session.getAttribute("user_id");
    }

    private boolean dadosJaExistem(UsuarioDAO userDAO) {
        Connection conn = openDatabase();
        try{
            String sql = "SELECT COUNT(*) FROM usuarios WHERE id = ? OR email_usuario = ?";
            
            try (PreparedStatement stmt = conn.prepareStatement(sql)) {
                stmt.setString(1, userDAO.getId_user());
                stmt.setString(2, userDAO.getEmail_usuario());
                ResultSet resultado = stmt.executeQuery();
                resultado.next();
                int count = resultado.getInt(1);
                
                return count > 0;
            }
        } catch (SQLException e) {
            e.printStackTrace();
            return true;
        }
    }
    private boolean itensJaExistem(BancoDAO bancouser) {
        conn = openDatabase();
        int items;
        try{
            String sql = "SELECT COUNT(*) FROM bancos_usuarios WHERE id_user = ? AND nome_item = ? AND categoria_item = ?";
            try(PreparedStatement stmt = conn.prepareStatement(sql)){
                stmt.setString(1, bancouser.getId_user());
                stmt.setString(2, bancouser.getNome_item());
                stmt.setString(3, bancouser.getCategoria_item());
                ResultSet resultado = stmt.executeQuery();
                resultado.next();
                items = resultado.getInt(1);
                return items > 0;
            }
        }catch ( SQLException e) {
            e.printStackTrace();
            return true;
        }
        
    }

}