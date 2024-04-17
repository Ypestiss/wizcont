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
import controller.Controller;
import model.BancoDAO;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.google.gson.reflect.TypeToken;



@WebServlet(urlPatterns = {"/CheckStatus", "/login", "/signup", "/logout", "/loginCheck", "/registerCheck"})
public class CheckStatus extends HttpServlet {
    Integer dados;
    ConexaoDAO connDAO = new ConexaoDAO();
    UsuarioDAO userDAO = new UsuarioDAO();
    Controller controlclass = new Controller();
    BancoDAO bancoDAO = new BancoDAO();

    Connection conn;

    public CheckStatus(){
        super();
    }


    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException{
        String action = request.getServletPath();
        HttpSession session = request.getSession();
        if(action.equals("/logout")){
            controlclass.deslogar(request, response);
        }else if(action.equals("/login")){
            if((Integer) session.getAttribute("statusLogin") != 0){
                controlclass.acessarcanal("main.jsp", request, response);
                System.out.println(session.getAttribute("statusLogin"));
            }
            else{
                controlclass.acessarcanal("login.jsp", request, response);
                System.out.println(session.getAttribute("statusLogin"));
            }
            System.out.println("[T] - Teste /login");
        }else if(action.equals("/signup")){
            controlclass.acessarcanal("signup.jsp", request, response);
            System.out.println("[T] - Teste /signup");
        }
    }
    
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        String action = request.getServletPath();
        if (action.equals("/loginCheck")){
            controlclass.logar(request,response); 
            System.out.println("\n[T] - Logado");
        }else if(action.equals("/registerCheck")){
            controlclass.registrar(request, response);
            System.out.println("\n[T] - Registrado ");
        }
    }

}
