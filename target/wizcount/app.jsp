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
    <script src="./styles/instascan.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/html5-qrcode/2.3.4/html5-qrcode.min.js" integrity="sha512-k/KAe4Yff9EUdYI5/IAHlwUswqeipP+Cp5qnrsUjTPCgl51La2/JhyyjNciztD7mWNKLSXci48m7cctATKfLlQ==" crossorigin="anonymous" referrerpolicy="no-referrer"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/qrcodejs/1.0.0/qrcode.min.js" integrity="sha512-CNgIRecGo7nphbeZ04Sc13ka07paqdeTu0WR1IM4kNcpmBAUSHSQX0FslNhTDadL4O5SAGapGt4FodqL8My0mA==" crossorigin="anonymous" referrerpolicy="no-referrer"></script>

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
            <div class="card-container" id='carnes-list'></div>
            <button onclick="adicionarItem('carnes')">+</button>
          </div>

          <div class="category">
            <h2 class="subtitleestoque">Frutas</h2>
            <div class="card-container" id="frutas-list"></div>
            <button onclick="adicionarItem('frutas')">+</button>
          </div>

          <div class="category">
            <h2 class="subtitleestoque">Grãos</h2>
            <div class="card-container" id="graos-list"></div>
            <button onclick="adicionarItem('graos')">+</button>
          </div>

          <div class="category">
            <h2 class="subtitleestoque">Legumes</h2>
            <div class="card-container" id="legumes-list"></div>
            <button onclick="adicionarItem('legumes')">+</button>
          </div>

          <div class="category">
            <h2 class="subtitleestoque">Vegetais</h2>
            <div class="card-container" id="vegetais-list"></div>
            <button onclick="adicionarItem('vegetais')">+</button>
          </div>

          <div class="category">
            <h2 class="subtitleestoque">Verduras</h2>
            <div class="card-container" id="verduras-list"></div>
            <button onclick="adicionarItem('verduras')">+</button>
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

        <!-- Conteúdo da página do leitor de QR -->
        <div id="qr-container" style="display: none;">                   
          <div class="menu-container">
            <h1>Leitor QR-CODE</h1>
            <style>
              #cam-menu {
                  display: flex;
                  justify-content: center;
                  align-items: center;
              }
              #reader {
                  width: 600px;
              }
              #result {
                  text-align: center;
                  font-size: 1.5rem;
              }
            </style>
            <button id="scanQR-button" onclick="scanQR()">Scan</button>        
            <div id ="cam-menu">
              <div id="reader"></div>
              <div id="result"></div>
            </div>
            <button id="complete-scan" display='none' ">Salvar</button>
          </div>
        </div>

        <!-- Conteúdo da página de Gerador de QR -->
        <div id="qr-generator" style="display: none;">
          <h2>Gerador QRcode</h2>
          <button id="generateQR-button" onclick="generateQR()">gerar QR</button>
          <div id="generator-result"></div>

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
                
                <div id="trocarDados">
                  <button id='emailButton' onclick="changeEmail()">Alterar email</button>
                </div>
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
  <script src="./styles/appTools.js"></script>
</html>