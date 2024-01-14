package controller;

import java.io.BufferedReader;
import java.io.IOException;
import java.sql.Connection;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;
import java.util.Random;

import javax.servlet.RequestDispatcher;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import model.ConexaoDAO;
import model.UsuarioDAO;
import model.BancoDAO;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.google.gson.reflect.TypeToken;


@WebServlet(urlPatterns = {"/Controller", "/main", "/login", "/logar", "/logout",
                            "/getarray", "/delitem","/signup", "/registrar", "/perfil"})
public class Controller extends HttpServlet {

    Integer dados;

    private static final long serialVersionUID = 1L;
    ConexaoDAO connDAO = new ConexaoDAO();
    UsuarioDAO userDAO = new UsuarioDAO();
    BancoDAO bancoDAO = new BancoDAO();

    Connection conn;
    
    public Controller() {
        super();    
    }

    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException{
        String action = request.getServletPath();
        System.out.println("Método: " + action + "\nValor de dados: " + connDAO.dados);
        if (action.equals("/main")){
            acessarcanal("main.jsp", request, response);
            System.out.println("\n[T] - Teste /main");
        }else if(action.equals("/login")){
            acessarcanal("login.jsp", request, response);
            System.out.println("[T] - Teste /login");
        }else if(action.equals("/logout")){
            deslogar(request, response);
        }else if(action.equals("/signup")){
            acessarcanal("signup.jsp", request, response);
            System.out.println("[T] - Teste /signup");
        }else if(action.equals("/perfil")){
            if(connDAO.dados == 1){
                comecar(request,response); 
                System.out.println("\n[T] - Teste /perfil");
            }else{
                acessarcanal("login.jsp", request, response);
            }
        }else{
            response.sendRedirect("index.html");    
            System.out.println(action);
        }
    }
    
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        String action = request.getServletPath();
        if (action.equals("/logar")){
            logar(request,response); 
            System.out.println("\n[T] - Logado");
        }else if(action.equals("/registrar")){
            registrar(request, response);
            System.out.println("\n[T] - Registrado ");
        }else if(action.equals("/getarray")){
            setarArrays(request, response);
            System.out.println("\n[T] - Arrays salvas");
        }else if(action.equals("/delitem")){
            deletarArrays(request, response);
            System.out.println("\n[T] - Deletado com sucesso");
        }
    }
    protected void comecar(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		HttpSession session = request.getSession();
        ArrayList<UsuarioDAO> perfil = connDAO.listarPerfil(request);
        ArrayList<BancoDAO> itens = connDAO.listarItems(request);
        for (BancoDAO item : itens) {
            System.out.println("Item do usuário: " +
                    "\n" + item.getId_user() +
                    "\n" + item.getNome_item() +
                    "\n" + item.getQtd_item() +
                    "\n" + item.getCategoria_item());
        }
        System.out.println("teste: " + session.getAttribute("itens"));
        request.setAttribute("itens_perfil", itens);
		request.setAttribute("usuario", perfil);
        System.out.println("[!] - valor de id: " + session.getAttribute("user_id"));
		RequestDispatcher rd = request.getRequestDispatcher("app.jsp");
		rd.forward(request, response);
	}

    protected void acessarcanal(String canal, HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        RequestDispatcher rd = request.getRequestDispatcher(canal);
        rd.forward(request, response);
         
    }

    protected void logar(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException{
        HttpSession session = request.getSession();
        
        String idUser = (String) session.getAttribute("user_id");
        String email = request.getParameter("email");
        String username = request.getParameter("username");
        String password = request.getParameter("password");

        userDAO.setId_user(idUser);
        userDAO.setEmail_usuario(email);
        userDAO.setNome_usuario(username);
        userDAO.setSenha_usuario(password);
        connDAO.fazerLogin(userDAO);

        System.out.println("função logar o id é :" + idUser);
        
        session.setAttribute("user_email", email);
        
        dados = connDAO.dados;
        if(dados == 1){
            response.sendRedirect("main");
        }
        else{
            response.sendRedirect("login");
        }

    }
    protected void setarArrays(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException{
        // - -  PEGANDO OS ARRAYS TRANSFORMADOS EM OBJETO JSON:
        StringBuilder requestBody = new StringBuilder();
        try (BufferedReader reader = request.getReader()){
                String line;
                while ((line = reader.readLine()) != null){
                    requestBody.append(line);
                }
            }
            String json = requestBody.toString();

            System.out.println("Objeto JSON recebido do cliente: " + json);

            Gson gson = new Gson();
            
            Data data = gson.fromJson(json, Data.class);
            
            List<List<String>> nomeItensArray = data.getItens();
            
            // - -  SETANDO OS VALORES DENTRO DAS ARRAYS EM SUAS RESPECTIVAS VARIAVEIS:
            String idUser = connDAO.getIdUsuario(request);
            HttpSession session = request.getSession();
            String idUser2 = (String) session.getAttribute("user_id");

            System.out.println("Valores da array nomeItensArray:");
            for (List<String> nomeItem : nomeItensArray) {
                System.out.println(nomeItem.get(0));
                System.out.println(nomeItem.get(1));
                System.out.println(idUser);
                bancoDAO.setId_user(idUser2);
                bancoDAO.setNome_item(nomeItem.get(0));
                bancoDAO.setQtd_item(Integer.parseInt(nomeItem.get(1)));
                bancoDAO.setCategoria_item(nomeItem.get(2));
                connDAO.salvarBanco(bancoDAO);
            }
            
        }

    protected void deletarArrays(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        BufferedReader reader = request.getReader();
        StringBuilder requestBody = new StringBuilder();
        String line;
        while ((line = reader.readLine()) != null) {
            requestBody.append(line);
        }
        String json = requestBody.toString();
    
        Gson gson = new Gson();
        List<String> item = gson.fromJson(json, new TypeToken<List<String>>(){}.getType());
    
        System.out.println(item);
    
        // Aqui você tem as informações do item a ser excluído
        String nomeItemParaExcluir = item.get(0);
        String quantidadeItemParaExcluir = item.get(1);
        String categoria = item.get(2);
    
        HttpSession session = request.getSession();
        String idUser = (String) session.getAttribute("user_id");
        bancoDAO.setId_user(idUser);
        bancoDAO.setNome_item(nomeItemParaExcluir);
        bancoDAO.setQtd_item(Integer.parseInt(quantidadeItemParaExcluir));
        bancoDAO.setCategoria_item(categoria);
        connDAO.deletarItem(bancoDAO);
    
        // Responde com um JSON de confirmação, se necessário
        response.setContentType("application/json");
        response.setCharacterEncoding("UTF-8");
        response.getWriter().write("{\"status\":\"success\"}");
    }
    protected void registrar(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        Random rand_id = new Random();
        int int_random = rand_id.nextInt(10000); 
        String id_user = String.format("%04d", int_random);
        String email = request.getParameter("email");
        String username = request.getParameter("username");
        String password = request.getParameter("password");
         
        System.out.println("email: " + email);
        System.out.println("username: " + username);
        System.out.println("password: " + password); 


        userDAO.setId_user(id_user);
        userDAO.setEmail_usuario(email);
        userDAO.setNome_usuario(username);
		userDAO.setSenha_usuario(password);

        
		connDAO.inserirRegistro(userDAO);

        HttpSession session = request.getSession();
        session.setAttribute("user_id", id_user);

        dados = connDAO.dados;
        if(dados == 1){
            response.sendRedirect("main");
        }
        else{
            response.sendRedirect("signup");
        }
        
	}

    protected void deslogar(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException{
        HttpSession session = request.getSession();
        
        if(session != null){
            session.invalidate();
            response.sendRedirect("login");
            connDAO.dados = 0;
            connDAO.itens = 0;
        }else{
        response.sendRedirect("main");
        }
    }

    class Data {
        private List<List<String>> Itens;

        public List<List<String>> getItens() {
            return Itens;
        }

        public void setItens(List<List<String>> itens) {
            this.Itens = itens;
        }
    }

    class OldData {
        private List<String> itens;
        
        public List<String> getItens() {
            return itens;
        }
        
        public void setItens(List<String> itens) {
            this.itens = itens;
        }
    }
    
}