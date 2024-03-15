<%@ page language="java" contentType="text/html; charset=utf-8"
	pageEncoding="utf-8"%>
<%@ page import="model.UsuarioDAO"%>
<%@ page import="model.BancoDAO"%>
<%@ page import="model.ConexaoDAO"%>
<%@ page import="java.util.ArrayList"%>
<%@ page import="com.google.gson.Gson"%>
<%
  @ SuppressWarnings ("unchecked")
  UsuarioDAO userDAO = new UsuarioDAO();
	BancoDAO bancoDAO = new BancoDAO();
  ConexaoDAO connDAO = new ConexaoDAO();
  ArrayList<UsuarioDAO> usuario = (ArrayList<UsuarioDAO>) request.getAttribute("usuario");
  ArrayList<BancoDAO> itensPerfil = (ArrayList<BancoDAO>) request.getAttribute("itens_perfil");
  Gson gson = new Gson();
  String jsonItensPerfil = gson.toJson(itensPerfil);
%>
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width">
    <title>WizCont.</title>
    <link href="./styles/appStyles.css" rel="stylesheet" type="text/css" />
    <script>
      var itens = <%=jsonItensPerfil%>;
    </script>
    <script src="./styles/appTools.js"></script>
    

  </head>
  <body id="light-theme">
    <!-- Barra de Navegação -->
    <div class="container">
      <div class="navigation">
        <ul>
          <!-----------------------------Indicador do estoque------------------------------>
          <li class="list active">
            <a href="#" onclick="mostrarEstoque()">
              <span class="icon">
                <img src="./icons/StockWhite.svg" id="stockIcon" width="25px" height="25px">
              </span>
              <span class="text">Estoque</span>
            </a>
          </li>
          <!-----------------------------Indicador do cardápio------------------------------>
          <li class="list active">
            <a href="#" onclick="mostrarCardapio()">
              <span class="icon"><img src="icons/MetaIcon.svg" id="metaIcon" width="25px" height="25px"></span>
              <span class="text">Cardápio</span>
            </a>
          </li>
          <li class="list active">
            <a href="#" onclick="mostrarNotificacao()">
              <span class="icon"><img src="icons/BellIcon.svg" id="metaIcon" width="25px" height="25px"></span>              <span class="text">Notificações</span>
            </a>
          </li>
          <!-----------------------------Indicador do perfil------------------------------>
          <li class="list active">
            <a href="#" onclick="mostrarPerfil()">
              <span class="icon"><img src="icons/icon.svg" id="metaIcon" width="25px" height="25px"></span>
              <span class="text">Perfil</span>
            </a>
          </li>
          <li class="list active">
            <a href="#" onclick="mostrarConfiguracao()">           
              <span class="icon"><img src="icons/ConfigIcon.svg" id="metaIcon" width="25px" height="25px"></span>
              <span class="text">Configurações</span>
            </a>
          </li>
          <div class="indicator"></div>
        </ul>  
      </div>
    </div>

    <!-- Conteúdos -->

    <div id="conteudo">
      <!-- Conteúdo da página de Estoque -->
        <!------- Alimentos ------->
        <div id="estoque" style="display: none;">
          <h2 id="titleestoque">Alimentos</h2>

          <div class="category">
            <h2 class="subtitleestoque">Proteína animal</h2>
            <button onclick="adicionarItem('carnes')">+</button>
            <div class="card-container" id='carnes-list'></div>
          </div>

          <div class="category">
            <h2 class="subtitleestoque">Frutas</h2>
            <button onclick="adicionarItem('frutas')">+</button>
            <div class="card-container" id="frutas-list"></div>
          </div>

          <div class="category">
            <h2 class="subtitleestoque">Grãos</h2>
            <button onclick="adicionarItem('graos')">+</button>
            <div class="card-container" id="graos-list"></div>
          </div>

          <div class="category">
            <h2 class="subtitleestoque">Legumes</h2>
            <button onclick="adicionarItem('legumes')">+</button>
            <div class="card-container" id="legumes-list"></div>
          </div>

          <div class="category">
            <h2 class="subtitleestoque">Vegetais</h2>
            <button onclick="adicionarItem('vegetais')">+</button>
            <div class="card-container" id="vegetais-list"></div>
          </div>

          <div class="category">
            <h2 class="subtitleestoque">Verduras</h2>
            <button onclick="adicionarItem('verduras')">+</button>
            <div class="card-container" id="verduras-list"></div>
          </div>

          
          <div class="container">
            <button onclick="trocarSecao()">Trocar Seção</button>
            <button onclick="setArrays()">Salvar</button>
          </div>
          
        </div>

        <!------- Limpeza ------->

        <div id="estoque-limp" style="display: none;">
          <h2 id="titleLimp">Limpeza</h2>
        
          <div class="category-limp">
            <h2 class="subtitleLimp">Piso</h2>
            <div class="card-container" id="piso-list"></div>
            <button onclick="adicionarItemLimp('piso')">+</button>
          </div>
          
          <div class="category-limp">
            <h2 class="subtitleLimp">Superfície de vidro</h2>
            <div class="card-container" id="vidro-list"></div>
            <button onclick="adicionarItemLimp('vidro')">+</button>
          </div>

          <div class="category-limp">
            <h2 class="subtitleLimp">Superfície de metálica</h2>
            <div class="card-container" id="metal-list"></div>
            <button onclick="adicionarItemLimp('metal')">+</button>
          </div>

        <div class="container">
          <button onclick="trocarSecao()">Trocar Seção</button>
          <button onclick="setArrays()">Salvar</button>
        </div>

        </div>

        <!-- Conteúdo da página de Cardápio -->
        <div id="cardapio" style="display: none;">                   
          <div class="menu-container">
            <h1>Cardápio</h1>
            <div id="menu"></div>
          </div>
        </div>

        <!-- Conteúdo da página de Notificação -->
        <div id="notificacao" style="display: none;">
          <h2>Notificações</h2>
          <p>Conteúdo da página de Notificações...</p>
        </div>

        <!-- Conteúdo da página de Perfil -->
        <div id="perfil" style="display: none;">
          <div class="profile-info">
            <label for="fileInput" class="profile-picture"> 
              <input type="file" id="fileInput" accept="image/*" onchange="previewImage(event)">
              <img id="preview" src="icons/icon.png" alt="Foto de Perfil" onclick="alterarImagem()">
            </label>
            <div class="user-details">
              <p id='perfil-nome'  name='perfil-nome'>Usuario: <%=usuario.get(0).getNome_usuario()%></p>
              <p id='perfil-email' name='perfil-email'>Email: <%=usuario.get(0).getEmail_usuario()%></p>
            </div>
          </div>
              <div id="opcoesPerfil">
                <p id="assinatura"><a href="#">Assinatura</a></p>
                <p id="altNome"><a href="altenick">Alterar Nome</a></p>
                <p id="altSenha"><a href="altpass">Alterar senha</a></p>
              </div>
              <form action='logout'>
                <button type='submit'>Desconectar</button>
              </form>

        </div>

        <!-- Conteúdo da página de Configuração -->
        <div id="configuracao" class="config-content" style="display: none;">
          <h2>Configuração</h2>

          <input type="checkbox" id="darklight" class="darklight">

          <div class="setting-item">
            <a id="sair" href="index.html">Sair</a>
        </div>
        <!-- Adicione outras seções conforme necessário -->
    </div>


  </body>
  <script src="./styles/Apptools.js"></script>
</html>