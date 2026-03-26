package com.agricultura.config;

import com.agricultura.domain.Usuario;
import com.agricultura.repository.UsuarioRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
@Slf4j
public class DataSeeder implements CommandLineRunner {

    private final UsuarioRepository usuarioRepository;
    private final PasswordEncoder passwordEncoder;

    @Value("${app.seeder.admin.email:admin@agricultura.com}")
    private String adminEmail;

    @Value("${app.seeder.admin.password:admin123}")
    private String adminPassword;

    @Value("${app.seeder.user.email:usuario@agricultura.com}")
    private String userEmail;

    @Value("${app.seeder.user.password:user123}")
    private String userPassword;

    @Override
    public void run(String... args) {
        if (usuarioRepository.count() == 0) {
            log.info("Criando usuários de teste...");
            
            Usuario admin = Usuario.builder()
                    .email(adminEmail)
                    .name("Administrador")
                    .password(passwordEncoder.encode(adminPassword))
                    .role("ADMIN")
                    .build();
            usuarioRepository.save(admin);
            log.info("Usuário admin criado: {}", adminEmail);

            Usuario usuario = Usuario.builder()
                    .email(userEmail)
                    .name("Usuário Teste")
                    .password(passwordEncoder.encode(userPassword))
                    .role("USER")
                    .build();
            usuarioRepository.save(usuario);
            log.info("Usuário teste criado: {}", userEmail);
            
            log.info("Seed de dados concluído com sucesso!");
        }
    }
}