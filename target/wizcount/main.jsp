<%@ page language="java" contentType="text/html; charset=utf-8"
	pageEncoding="utf-8"%>
<%@ page import="model.UsuarioDAO"%>
<%@ page import="java.util.ArrayList"%>
<%
	@ SuppressWarnings ("unchecked")
	ArrayList<UsuarioDAO> perfil = (ArrayList<UsuarioDAO>) request.getAttribute("usuario");
%>
<!DOCTYPE html>
<html>

<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width">
  <title>WizCont</title>
  <link href="./styles/mainStyles.css" rel="stylesheet" type="text/css" />
  <script src="./styles/mainTools.js"></script>
  <script src="./styles/userTools.js"></script>
</head>

<body id="background">
  <div id="main_background">
  </div>

  <!--Cabeçalho-->
  
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

  <!--Conteúdo principal-->

  <div id="main_content">
    <h1 id="title"></h1>
    <p id="subtitle">O melhor site de gerenciamento de <br> estoque do Brasil.</p>
  </div>
  <form id="botoes" action="perfil">
    <div id="botoes">
      <button class="comecar" type="submit">Começar</button>
    </div>
  </form>

<div id="veja_mais">
    <pq id="veja">Veja mais!</p><a id="seta"><img src="./icons/arrow.png" width="10px" height="10px" alt="seta"></a>
  </div>

  <div id="more">
    <h1 id="more_title"  class="hidden">O que é WizCont?</h1>
    <p id="more_subtitle"  class="hidden">WizCont é uma ferramenta gratuita<br> que te ajuda a gerenciar seu estoque<br> e seus
      produtos, além de calcular<br>preços e descontos! Incrível né?</p>
  </div>

</body>

</html>