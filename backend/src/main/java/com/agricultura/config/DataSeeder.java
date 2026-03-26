package com.agricultura.config;

import com.agricultura.domain.Usuario;
import com.agricultura.repository.UsuarioRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
@Slf4j
public class DataSeeder implements CommandLineRunner {

    private final UsuarioRepository usuarioRepository;
    private final PasswordEncoder passwordEncoder;

    @Override
    public void run(String... args) {
        if (usuarioRepository.count() == 0) {
            log.info("Criando usuários de teste...");
            
            Usuario admin = Usuario.builder()
                    .email("admin@agricultura.com")
                    .name("Administrador")
                    .password(passwordEncoder.encode("admin123"))
                    .role("ADMIN")
                    .build();
            usuarioRepository.save(admin);
            log.info("Usuário admin criado: admin@agricultura.com / admin123");

            Usuario usuario = Usuario.builder()
                    .email("usuario@agricultura.com")
                    .name("Usuário Teste")
                    .password(passwordEncoder.encode("user123"))
                    .role("USER")
                    .build();
            usuarioRepository.save(usuario);
            log.info("Usuário teste criado: usuario@agricultura.com / user123");
            
            log.info("Seed de dados concluído com sucesso!");
        }
    }
}