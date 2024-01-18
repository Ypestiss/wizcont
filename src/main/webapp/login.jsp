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
  <link rel="stylesheet" href="./styles/LoginStyles.css">
  <script src="./styles/loginTools.js"></script>
  <script src="./styles/loginUserTools.js"></script>
  
</head>

<body>
  <header>

    <nav id="cab">

      <ul>

        <li class="home"><a style="float: left;" id="home" href="main">Home</a></li>

        <li class="user">
          <span id="linkSpan" style="float: right; position: relative;">
            <img src="icons/icon.svg" id="user" width="35px" height="35px">
            <div class="user-options" id="userOptions" style="display: none; position: absolute; top: 40px; right: 0;">
              <a href="login">Entrar</a>
              <a href="signup">Cadastrar</a>
            </div>
          </span>
        </li>        
        
      </ul>
        
    </nav>

  </header>

  
  <form name="loginForm" method="post" action="logar">
    <div class="login-container">
      <h2>Login</h2>
      <div class="input-group">
        <label for="username">E-mail:</label>
        <input type="text" id="email" name='email' required>
      </div>
      <div class="input-group">
        <label for="password">Senha:</label>
        <input type="password" id="password" name='password' required>
      </div>
      <div class="input-group">
        <button type="submit" >Entrar</button>
      </div>
      <div>
      <p id="msg">Não é cadastrado? <a id="linkCadastro" href="./signup">Cadastrar-se</a><p>
      </div>
    </div>
  </form>

</body>

</html>