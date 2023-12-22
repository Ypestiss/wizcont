package model;
import java.sql.*;
import java.util.ArrayList;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

public class ConexaoDAO {

    Connection conn;
    public Integer dados = 0;

    public Connection openDatabase() {
        System.out.println("[><] Função chamada: OpenDatabase:");
        try {
            System.out.println("[_/] Trying to OpenDatabase:");
            Class.forName("com.mysql.cj.jdbc.Driver");
            return DriverManager.getConnection("jdbc:mysql://192.168.0.117:3306/db_wizcont", "admin", "admin");
        } catch (ClassNotFoundException | SQLException e) {
            throw new RuntimeException("[!] - Erro: Erro ao acessar o banco de dados: " + e);
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
                System.out.println("Perfil do usuario: " + "\n" 
                    +iduser + "\n" + nomeuser+ "\n" + senhauser + "\n" + emailuser);
            }
            return usuario;
        } catch(Exception e) {
            System.out.println(e);
            return null;
        }
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
            return true; // Considere tratar esse erro adequadamente no seu código
        }
    }

}