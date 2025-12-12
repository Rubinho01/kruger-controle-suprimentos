package com.example.krugerapp.controllers;

import com.example.krugerapp.entities.Usuario;
import com.example.krugerapp.repositories.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;

@Controller
public class UsuarioController {

    @GetMapping("/login")
    public String login(){
        return "login";
    }

    @GetMapping("/")
    public String index(){
        return "index";
    }

}

// Endpoint temporário para debug - REMOVER EM PRODUÇÃO
@RestController
@RequestMapping("/api/debug")
class DebugController {

    private final PasswordEncoder passwordEncoder;
    private final UsuarioRepository usuarioRepository;

    public DebugController(PasswordEncoder passwordEncoder, UsuarioRepository usuarioRepository) {
        this.passwordEncoder = passwordEncoder;
        this.usuarioRepository = usuarioRepository;
    }

    @GetMapping("/encode")
    public ResponseEntity<Map<String, String>> encodePassword(@RequestParam String senha) {
        Map<String, String> response = new HashMap<>();
        String encoded = passwordEncoder.encode(senha);
        response.put("senhaOriginal", senha);
        response.put("senhaCodificada", encoded);
        return ResponseEntity.ok(response);
    }

    @GetMapping("/check-user")
    public ResponseEntity<Map<String, Object>> checkUser(@RequestParam String username) {
        Map<String, Object> response = new HashMap<>();
        Usuario usuario = usuarioRepository.findByUsuarioNome(username).orElse(null);
        
        if (usuario == null) {
            response.put("encontrado", false);
            response.put("mensagem", "Usuário não encontrado");
        } else {
            response.put("encontrado", true);
            response.put("username", usuario.getUsuarioNome());
            response.put("role", usuario.getRole());
            String senha = usuario.getUsuarioSenha();
            if (senha != null) {
                response.put("senhaIniciaCom$2a", senha.startsWith("$2a$") || senha.startsWith("$2b$"));
                response.put("senhaLength", senha.length());
                response.put("senhaPreview", senha.substring(0, Math.min(30, senha.length())));
            }
        }
        return ResponseEntity.ok(response);
    }

    @GetMapping("/test-match")
    public ResponseEntity<Map<String, Object>> testMatch(
            @RequestParam String senhaPlana,
            @RequestParam String senhaCodificada) {
        Map<String, Object> response = new HashMap<>();
        boolean matches = passwordEncoder.matches(senhaPlana, senhaCodificada);
        response.put("senhaPlana", senhaPlana);
        response.put("senhaCodificada", senhaCodificada);
        response.put("matches", matches);
        return ResponseEntity.ok(response);
    }
}
