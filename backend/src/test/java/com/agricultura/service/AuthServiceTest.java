package com.agricultura.service;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.Mockito.*;

import com.agricultura.domain.Usuario;
import com.agricultura.dto.AuthResponse;
import com.agricultura.dto.LoginRequest;
import com.agricultura.dto.RegisterRequest;
import com.agricultura.exception.BusinessException;
import com.agricultura.exception.ResourceNotFoundException;
import com.agricultura.repository.UsuarioRepository;
import com.agricultura.security.CustomUserDetails;
import com.agricultura.security.JwtService;
import java.util.Collections;
import java.util.Optional;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;

@ExtendWith(MockitoExtension.class)
class AuthServiceTest {

    @Mock
    private UsuarioRepository usuarioRepository;

    @Mock
    private PasswordEncoder passwordEncoder;

    @Mock
    private JwtService jwtService;

    @Mock
    private AuthenticationManager authenticationManager;

    @Mock
    private LoginAttemptService loginAttemptService;

    @InjectMocks
    private AuthService authService;

    private RegisterRequest registerRequest;
    private LoginRequest loginRequest;
    private Usuario usuario;

    @BeforeEach
    void setUp() {
        registerRequest = new RegisterRequest();
        registerRequest.setName("Test User");
        registerRequest.setEmail("test@example.com");
        registerRequest.setPassword("Password123!");

        loginRequest = new LoginRequest();
        loginRequest.setEmail("test@example.com");
        loginRequest.setPassword("Password123!");

        usuario = Usuario.builder()
                .id(1L)
                .name("Test User")
                .email("test@example.com")
                .password("encodedPassword")
                .role("USER")
                .build();

        UsernamePasswordAuthenticationToken auth =
                new UsernamePasswordAuthenticationToken("test@example.com", null, Collections.emptyList());
        SecurityContextHolder.getContext().setAuthentication(auth);
    }

    @AfterEach
    void tearDown() {
        SecurityContextHolder.clearContext();
    }

    @Test
    void register_Success() {
        when(usuarioRepository.existsByEmail(anyString())).thenReturn(false);
        when(passwordEncoder.encode(anyString())).thenReturn("encodedPassword");
        when(usuarioRepository.save(any(Usuario.class))).thenReturn(usuario);
        when(jwtService.generateToken(any(Usuario.class))).thenReturn("jwtToken");

        AuthResponse response = authService.register(registerRequest);

        assertNotNull(response);
        assertEquals("jwtToken", response.getToken());
        assertEquals("Bearer", response.getType());
        assertEquals(1L, response.getId());
        assertEquals("test@example.com", response.getEmail());

        verify(usuarioRepository).save(any(Usuario.class));
    }

    @Test
    void register_EmailAlreadyInUse() {
        when(usuarioRepository.existsByEmail(anyString())).thenReturn(true);

        assertThrows(BusinessException.class, () -> authService.register(registerRequest));
        verify(usuarioRepository, never()).save(any());
    }

    @Test
    void login_Success() {
        when(loginAttemptService.isBlocked(anyString())).thenReturn(false);
        when(authenticationManager.authenticate(any(UsernamePasswordAuthenticationToken.class)))
                .thenReturn(mock(Authentication.class));
        when(usuarioRepository.findByEmail(anyString())).thenReturn(Optional.of(usuario));
        when(jwtService.generateToken(any(Usuario.class))).thenReturn("jwtToken");

        AuthResponse response = authService.login(loginRequest);

        assertNotNull(response);
        assertEquals("jwtToken", response.getToken());
        assertEquals(1L, response.getId());

        verify(authenticationManager).authenticate(any(UsernamePasswordAuthenticationToken.class));
        verify(loginAttemptService).loginSucceeded(anyString());
    }

    @Test
    void login_AccountBlocked_ThrowsException() {
        when(loginAttemptService.isBlocked(anyString())).thenReturn(true);
        when(loginAttemptService.getRemainingLockMinutes(anyString())).thenReturn(25L);

        assertThrows(BusinessException.class, () -> authService.login(loginRequest));
        verify(authenticationManager, never()).authenticate(any());
    }

    @Test
    void login_UserNotFound() {
        when(loginAttemptService.isBlocked(anyString())).thenReturn(false);
        when(authenticationManager.authenticate(any(UsernamePasswordAuthenticationToken.class)))
                .thenReturn(mock(Authentication.class));
        when(usuarioRepository.findByEmail(anyString())).thenReturn(Optional.empty());

        assertThrows(RuntimeException.class, () -> authService.login(loginRequest));
    }

    @Test
    void login_AuthenticationFailed_TracksFailure() {
        when(loginAttemptService.isBlocked(anyString())).thenReturn(false);
        when(authenticationManager.authenticate(any(UsernamePasswordAuthenticationToken.class)))
                .thenThrow(new org.springframework.security.authentication.BadCredentialsException("Bad credentials"));

        assertThrows(
                org.springframework.security.authentication.BadCredentialsException.class,
                () -> authService.login(loginRequest));

        verify(loginAttemptService).loginFailed(anyString());
    }

    @Test
    void getCurrentUser_ReturnsCurrentUser() {
        CustomUserDetails customUserDetails =
                new CustomUserDetails(usuario.getId(), usuario.getEmail(), usuario.getPassword(), usuario.getRole());
        SecurityContextHolder.getContext()
                .setAuthentication(
                        new UsernamePasswordAuthenticationToken(customUserDetails, null, Collections.emptyList()));

        when(usuarioRepository.findById(1L)).thenReturn(Optional.of(usuario));

        Usuario result = authService.getCurrentUser();

        assertNotNull(result);
        assertEquals("test@example.com", result.getEmail());
        assertEquals(1L, result.getId());
    }

    @Test
    void getCurrentUserId_ExtractsFromSecurityContext() {
        CustomUserDetails customUserDetails =
                new CustomUserDetails(usuario.getId(), usuario.getEmail(), usuario.getPassword(), usuario.getRole());
        SecurityContextHolder.getContext()
                .setAuthentication(
                        new UsernamePasswordAuthenticationToken(customUserDetails, null, Collections.emptyList()));

        Long userId = authService.getCurrentUserId();

        assertEquals(1L, userId);
    }

    @Test
    void getCurrentUserId_NotAuthenticated_ThrowsException() {
        SecurityContextHolder.clearContext();

        assertThrows(ResourceNotFoundException.class, () -> authService.getCurrentUserId());
    }
}
