<%@ page language="java" contentType="text/html; charset=utf-8"
	pageEncoding="utf-8"%>
<!DOCTYPE html>
<html lang="pt-BR">

<head>
  <meta charset="utf-8">
  <title>Página de Cadastro</title>
  <link rel="stylesheet" href="./styles/SignupStyles.css">
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

  
  <form name="loginForm" method="post" action="registrar">
    <div class="login-container">
      <h2>Junte-se a nós! ;)</h2>
      <div class="input-group">
        <label for="email">E-mail:</label>
        <input type="text" id="email" name='email' required>
      </div>
      <div class="input-group">
        <label for="username">Nome de Usuário:</label>
        <input type="text" id="username" name='username'required>
      </div>
      <div class="input-group">
        <label for="password">Senha:</label>
        <input type="password" id="password" name='password'required >
      </div>
      <div class="input-group">
        <button type="submit" >Registrar</button>
      </div>
      <div>
      <p id="msg">Já é cadastrado? <a id="linkLogin">Entre!</a><p>
      </div>
    </div>
  </form>

</body>

</html>