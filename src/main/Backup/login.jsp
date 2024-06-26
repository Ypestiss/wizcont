<%@ page language="java" contentType="text/html; charset=utf-8"
	pageEncoding="utf-8"%>
<%@ page import="model.UsuarioDAO"%>
<%@ page import="java.util.ArrayList"%>
<%
	@ SuppressWarnings ("unchecked")
	ArrayList<UsuarioDAO> perfil = (ArrayList<UsuarioDAO>) request.getAttribute("usuario");
%>
<!DOCTYPE html>
<html lang="pt-BR">

<head>
  <meta charset="utf-8">
  <title>Página de Login</title>
  <meta name="viewport" content="width=device-width">
  <link type="text/css" rel="stylesheet" href="./styles/css/LoginStyles.css">
  <script src="./styles/js/loginTools.js"></script>
  <script src="./styles/js/loginUserTools.js"></script>
  <script src="./styles/js/loginTools.js"></script>
  
</head>

<body id="background">
 <header>

    <nav id="cab">

      <ul>

        <li class="home"><a style="float: left;" id="home" href="main">Home</a></li>
        <li class="user">
          <span id="linkSpan" style="float: right; position: relative;">
            <img src="./icons/icon.svg" id="user" width="35px" height="35px">
            <div class="user-options" id="userOptions" style="display: none; position: absolute; top: 40px; right: 0;">
              <a href="login">Entrar</a>
              <a href="signup">Cadastrar</a>
            </div>
          </span>
        </li>        
        
      </ul>
        
    </nav>

  </header>

  <div class="login">
    <div class="login-form">
      <form name="loginForm" method="post" action="loginCheck">
            <h2>LOGIN</h2>
            <div class="input-group">
              <label for="username">Usuário ou E-mail:</label>
              <input type="text" id="email" name='email' required>
            </div>
            <div class="input-group">
              <label for="password">Senha:</label>
              <input type="password" id="password" name='password' required>
            </div>
            <div class="input-group">
              <button type="submit">Entrar</button>
            </div>
            <div>
            <p id="msg">Não é cadastrado? <a id="linkCadastro" href="./signup">Cadastrar-se</a><p>
            </div>
      </form>
    </div>
  </div>
</body>
</html>