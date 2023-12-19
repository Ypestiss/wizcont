<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@ page import="javax.servlet.http.HttpSession" %>

<%
    // Invalidar a sessão
    HttpSession session = request.getSession(false);
    if (session != null) {
        session.invalidate();
    }

    // Redirecionar para a página de login ou para a página inicial
    response.sendRedirect("main.jsp"); // ou response.sendRedirect("index.html");
%>