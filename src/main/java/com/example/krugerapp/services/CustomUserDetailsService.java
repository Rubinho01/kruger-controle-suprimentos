package com.example.krugerapp.services;

import com.example.krugerapp.entities.Usuario;
import com.example.krugerapp.repositories.UsuarioRepository;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class CustomUserDetailsService implements UserDetailsService {

    private final UsuarioRepository usuarioRepository;

    public CustomUserDetailsService(UsuarioRepository usuarioRepository) {
        this.usuarioRepository = usuarioRepository;
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        Usuario usuario = usuarioRepository.findByUsuarioNome(username)
                .orElseThrow(() -> new UsernameNotFoundException("Usuário não encontrado: " + username));

        String role = usuario.getRole();
        if (role == null || role.trim().isEmpty()) {
            role = "USER"; // Role padrão se não estiver definido
        }

        // Log para debug - REMOVER EM PRODUÇÃO
        System.out.println("=== DEBUG LOGIN ===");
        System.out.println("Usuário encontrado: " + usuario.getUsuarioNome());
        System.out.println("Senha no banco (primeiros 20 chars): " + 
            (usuario.getUsuarioSenha() != null ? usuario.getUsuarioSenha().substring(0, Math.min(20, usuario.getUsuarioSenha().length())) : "null"));
        System.out.println("Role: " + role);
        System.out.println("==================");

        return User.withUsername(usuario.getUsuarioNome())
                .password(usuario.getUsuarioSenha())
                .roles(role)
                .build();
    }
}