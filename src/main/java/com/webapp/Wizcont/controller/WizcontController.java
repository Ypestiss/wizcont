package com.webapp.Wizcont.controller;

import java.util.ArrayList;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.*;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.SessionAttributes;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.webapp.Wizcont.model.BancoDAO;
import com.webapp.Wizcont.model.repository.BancoDAOConexao;
import com.webapp.Wizcont.model.UsuarioDAO;
import com.webapp.Wizcont.model.repository.UsuarioDAOConexao;
import com.webapp.Wizcont.model.enums.StatusCategoria;
import com.webapp.Wizcont.model.enums.StatusMedida;
import com.webapp.Wizcont.model.enums.StatusUser;

@Controller
@SessionAttributes("usuario")
public class WizcontController {

    @Autowired
    private UsuarioDAOConexao wizdb;
    @Autowired
    private BancoDAOConexao bancodb;


    @GetMapping("/main")
    public String main(Model model, @ModelAttribute("usuario") UsuarioDAO usuarios){
        UsuarioDAO usuario = usuarios;
        if(usuario != null){
            System.out.println("teste: " + usuario.toString());
        }
        return "main";

    }

    @GetMapping("/registro")
    public String registro(Model model, @ModelAttribute("usuario") UsuarioDAO usuarios){
        UsuarioDAO status = usuarios;
        if(status != null){
            System.out.println(usuarios);
            return "redirect:/main";
        }else{
            System.out.println(usuarios);
            return "registro";
        }
        
    }
    @GetMapping("/login")
    public String login(Model model, @ModelAttribute("usuario") UsuarioDAO usuarios) {
        UsuarioDAO status = usuarios;
        if(status != null){
            System.out.println(status);
            return "redirect:/main";
        }else{  
            System.out.println(status);
            return "login";
        }
    }
    @GetMapping("/logoff")
    public String logoff(@ModelAttribute("usuario") UsuarioDAO status, Model model){
        if(status != null){
            status.setStatus(StatusUser.INATIVO);
            return "redirect:/login";
        }else{  
            System.out.println(status);
            return "error";
        }
    }
    @GetMapping("/app")
    public String app(@ModelAttribute("usuario") UsuarioDAO usuarios, @ModelAttribute("itensBanco") BancoDAO itens, Model model){
        UsuarioDAO status = usuarios;
        if(status != null){
            ArrayList<BancoDAO> itensBanco = bancodb.findByUserId(usuarios.getId_user());
            
            model.addAttribute("itensBanco", itensBanco);
            model.addAttribute("categorias", StatusCategoria.values());
            return "app";
        }else{  
            System.out.println(status);
            return "redirect:/login";
        }
    }

    @PostMapping("/registrar")
    public String registrar(Model model, @RequestParam("email_usuario") String email_usuario, @RequestParam("nome") String username,
        @RequestParam("senha") String userpass) {
            UsuarioDAO usuario = new UsuarioDAO();
            usuario.setEmail(email_usuario);
            usuario.setNome_usuario(username);
            usuario.setSenha(userpass);
            usuario.setStatus(StatusUser.INATIVO);
            wizdb.save(usuario);
            System.out.println(usuario);

        return "redirect:/login";
        }
    
    @PostMapping("/logar")
    public String logar(Model model, RedirectAttributes redirectAttributes, @RequestParam("email_usuario") String email_usuario, @RequestParam("senha_usuario") String senha_usuario){
        UsuarioDAO user = autenticar(email_usuario, senha_usuario);
        if(user != null){     
            wizdb.save(user);   
            model.addAttribute("usuario", user);
            List<BancoDAO> banco = bancodb.findByUserId(user.getId_user());
            model.addAttribute("itensBanco", banco);
            return "redirect:/main";
        }else{
            System.out.println("valor de senha na else logar: " + senha_usuario);
            return "redirect:/login";
        }

    }   

    
    @PostMapping("/save")
    public String saveEstoque(@RequestBody List<BancoDAO> arrayObjList, Model model, RedirectAttributes rdAtt, @ModelAttribute("usuario") UsuarioDAO usuario){        ObjectMapper mapper = new ObjectMapper();
        BancoDAO arrayObj = mapper.convertValue(arrayObjList, BancoDAO.class);

        System.out.println("Valor de array obj: " + arrayObj);
        model.addAttribute("ItensBanco", arrayObj);

       // BancoDAO banco = new BancoDAO();
        // if(usuario != null && usuario.getStatus() == StatusUser.ATIVO){
        //     banco.setId_user(usuario.getId_user());
        //     banco.setNome_item();
        //     banco.setMedida(medida);
        //     banco.setQtd_item(qtd_item);
        //     banco.setCategoria(categoria);
        //     bancodb.save(banco);
        //     model.addAttribute("itensBanco", banco);
        //     return "redirect:/estoque";
        // }
        
        
        return "redirect:/estoque";
    }
    @PostMapping("/app/saveItens")
    public String saveItens(@RequestParam("nomeItem") List<String> nomesItens, 
                        @RequestParam("quantidadeItem") List<Integer> quantidadesItens,
                        @RequestParam("categoriaItem") List<String> categoriasItens,
                        @RequestParam("medidaItem") List<String> medidasItens,
                        @ModelAttribute("itensBanco") BancoDAO userBanco,
                        @ModelAttribute("usuario") UsuarioDAO user) {
        List<BancoDAO> newItens = new ArrayList<>();

        for(int i = 0; i< nomesItens.size(); i++){
            BancoDAO newItem = new BancoDAO();
            newItem.setNome_item(nomesItens.get(i));
            newItem.setQtd_item(quantidadesItens.get(i));
            newItem.setMedida(StatusMedida.valueOf(medidasItens.get(i)));
            newItem.setCategoria(StatusCategoria.valueOf(categoriasItens.get(i)));
            newItem.setId_user(user.getId_user());
            newItens.add(newItem);

            System.out.println("valor de new itens 1 " + newItens);
        }
        System.out.println("valor de new itens 2 " + newItens);
        for(BancoDAO item : newItens){
            System.out.println(item);
            bancodb.save(item);
        }        
        if(newItens.size() > 0){
            return "redirect:/app"; 
        }
        return "redirect:/error";
    }

    @ModelAttribute("usuario")
    public UsuarioDAO autenticar(String email_usuario, String senha_usuario){
        UsuarioDAO usuario = wizdb.findByEmail(email_usuario);
        if(usuario != null && usuario.getSenha().equals(senha_usuario)){
            return usuario;
        }else{
            return null;
        }
        
    }
}
