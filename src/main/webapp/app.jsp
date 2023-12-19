<%@ page language="java" contentType="text/html; charset=utf-8"
	pageEncoding="utf-8"%>
<%@ page import="model.UsuarioDAO"%>
<%@ page import="java.util.ArrayList"%>
<%
	@ SuppressWarnings ("unchecked")
	ArrayList<UsuarioDAO> usuario = (ArrayList<UsuarioDAO>) request.getAttribute("usuario");
  UsuarioDAO userDAO = new UsuarioDAO();
%>
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width">
    <title>Área de Estoque</title>
    <link href="styles/appStyles.css" rel="stylesheet" type="text/css" />
    <script src="styles/appTools.js"></script>
    <script src="styles/appConfig.js"></script>
    <script src="styles/appStock.js"></script>
    
  </head>
  <body>
    <!-- Barra de Navegação -->
    <div class="container">
      <div class="navigation">
        <ul>
          <li class="list active">
            <a href="#" onclick="mostrarEstoque()">
              <span class="icon">
                <img src="icons/StockWhite.png" id="stockIcon" width="25px" height="25px">
              </span>
              <span class="text">Estoque</span>
            </a>
          </li>
          <li class="list active">
            <a href="#" onclick="mostrarMetas()">
              <span class="icon"><img src="icons/MetaIcon.png" id="metaIcon" width="25px" height="25px"></span>
              <span class="text">Metas</span>
            </a>
          </li>
          <li class="list active">
            <a href="#" onclick="mostrarNotificacao()">
              <span class="icon"><img src="icons/BellIcon.png" id="metaIcon" width="25px" height="25px"></span>
              <span class="text">Notificações</span>
            </a>
          </li>
          <li class="list active">
            <a href="#" onclick="mostrarPerfil()">
              <span class="icon"><img src="icons/icon.png" id="metaIcon" width="30px" height="30px"></span>
              <span class="text">Perfil</span>
            </a>
          </li>
          <li class="list active">
            <a href="#" onclick="mostrarConfiguracao()">
              <span class="icon"><img src="icons/ConfigIcon.png" id="metaIcon" width="25px" height="25px"></span>
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
      <div id="estoque" style="display: none;">
        <h2 id="titleestoque">Estoque</h2>

        <div class="category">
          <h2 class="subtitleestoque">Carnesl</h2>
          <div class="card-container" id="carnes-list"></div>
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

        <div class="category">
          <h2 class="subtitleestoque">Adicionar Categoria</h2>
          <input type="text" id="novaCategoriaInput" placeholder="Digite o nome da nova categoria">
          <button onclick="adicionarCategoria()">Adicionar</button>
        </div>
      
      </div>

      <!-- Conteúdo da página de Metas -->
      <div id="metas" style="display: none;">
        <h2>Metas</h2>
        <p>Conteúdo da página de Metas...</p>
      </div>

      <!-- Conteúdo da página de Notificação -->
      <div id="notificacao" style="display: none;">
        <h2>Notificações</h2>
        <p>Conteúdo da página de Notificações...</p>
      </div>

      <!-- Conteúdo da página de Perfil -->
      
      <div id="perfil" style="display: none;">
        <h2>Perfil</h2>
        <p id='perfil-nome'  name='perfil-nome'>Nome: <%=usuario.get(0).getNome_usuario()%></p>
        <p id='perfil-senha' name='perfil-senha'>Senha: <%=usuario.get(0).getSenha_usuario()%></p>
        <p id='perfil-email' name='perfil-email'>Email: <%=usuario.get(0).getEmail_usuario()%></p>
        <form action='logout'>
          <button type='submit'>Desconectar</button>
        </form>
      </div>

      <!-- Conteúdo da página de Configuração -->
      <div id="configuracao" style="display: none;">
        <h2>Configuração</h2>
        <p>Conteúdo da página de Configuração...</p>

        <div class="setting-item">
          <a id="sair" href="/index.html">Sair</a>
        </div>
      </div>
      <!-- Adicione outras seções conforme necessário -->
    </div>


  </body>
</html>