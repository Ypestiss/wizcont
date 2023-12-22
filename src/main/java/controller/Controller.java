package controller;
import java.io.IOException;
import java.sql.Connection;
import java.util.ArrayList;
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


@WebServlet(urlPatterns = {"/Controller", "/main", "/login", "/logar", "/logout", "/signup", "/registrar", "/perfil"})
public class Controller extends HttpServlet {

    Integer dados;

    private static final long serialVersionUID = 1L;
    ConexaoDAO connDAO = new ConexaoDAO();
    UsuarioDAO userDAO = new UsuarioDAO();

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
            System.out.println("\n[T] - Teste /logar");
        }else if(action.equals("/registrar")){
            registrar(request, response);
            System.out.println("\n[T] - Teste /registrar");
        }

    }

    protected void comecar(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		ArrayList<UsuarioDAO> perfil = connDAO.listarPerfil(request);
        UsuarioDAO user = new UsuarioDAO();
		request.setAttribute("usuario", perfil);
        System.out.println("\n[T] - Valor de Id: " + user.getId_user());
		RequestDispatcher rd = request.getRequestDispatcher("app.jsp");
		rd.forward(request, response);
	}

    protected void acessarcanal(String canal, HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        RequestDispatcher rd = request.getRequestDispatcher(canal);
        rd.forward(request, response);
         
    }

    protected void logar(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException{
        String email = request.getParameter("email");
        String username = request.getParameter("username");
        String password = request.getParameter("password");

        userDAO.setEmail_usuario(email);
        userDAO.setNome_usuario(username);
        userDAO.setSenha_usuario(password);
        connDAO.fazerLogin(userDAO);

        HttpSession session = request.getSession();
        session.setAttribute("user_email", email);
        
        dados = connDAO.dados;
        if(dados == 1){
            response.sendRedirect("main");
        }
        else{
            response.sendRedirect("login");
        }

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
        }else{
        response.sendRedirect("main");
        }
    }
}