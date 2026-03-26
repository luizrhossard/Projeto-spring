package com.agricultura.service;

import com.agricultura.domain.PrecoMercado;
import com.agricultura.domain.Usuario;
import com.agricultura.dto.PrecoMercadoRequest;
import com.agricultura.dto.PrecoMercadoResponse;
import com.agricultura.repository.PrecoMercadoRepository;
import com.agricultura.repository.UsuarioRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class PrecoMercadoService {

    private final PrecoMercadoRepository precoMercadoRepository;
    private final UsuarioRepository usuarioRepository;

    @Transactional(readOnly = true)
    public List<PrecoMercadoResponse> findAll(Long userId) {
        return precoMercadoRepository.findByUserId(userId).stream()
                .map(this::toResponse)
                .collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public PrecoMercadoResponse findById(Long id, Long userId) {
        PrecoMercado preco = precoMercadoRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Preço de mercado não encontrado"));
        
        if (!preco.getUser().getId().equals(userId)) {
            throw new RuntimeException("Acesso negado a este preço");
        }
        
        return toResponse(preco);
    }

    @Transactional
    public PrecoMercadoResponse create(PrecoMercadoRequest request, Long userId) {
        Usuario usuario = usuarioRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("Usuário não encontrado"));
        
        PrecoMercado preco = PrecoMercado.builder()
                .produto(request.getProduto())
                .preco(request.getPreco())
                .unidade(request.getUnidade() != null ? request.getUnidade() : "sc")
                .variacao(request.getVariacao())
                .user(usuario)
                .build();
        
        preco = precoMercadoRepository.save(preco);
        
        return toResponse(preco);
    }

    @Transactional
    public PrecoMercadoResponse update(Long id, PrecoMercadoRequest request, Long userId) {
        PrecoMercado preco = precoMercadoRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Preço de mercado não encontrado"));
        
        if (!preco.getUser().getId().equals(userId)) {
            throw new RuntimeException("Acesso negado a este preço");
        }
        
        preco.setProduto(request.getProduto());
        preco.setPreco(request.getPreco());
        if (request.getUnidade() != null) {
            preco.setUnidade(request.getUnidade());
        }
        preco.setVariacao(request.getVariacao());
        
        preco = precoMercadoRepository.save(preco);
        
        return toResponse(preco);
    }

    @Transactional
    public void delete(Long id, Long userId) {
        PrecoMercado preco = precoMercadoRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Preço de mercado não encontrado"));
        
        if (!preco.getUser().getId().equals(userId)) {
            throw new RuntimeException("Acesso negado a este preço");
        }
        
        precoMercadoRepository.delete(preco);
    }

    private PrecoMercadoResponse toResponse(PrecoMercado preco) {
        return PrecoMercadoResponse.builder()
                .id(preco.getId())
                .produto(preco.getProduto())
                .preco(preco.getPreco())
                .unidade(preco.getUnidade())
                .variacao(preco.getVariacao())
                .dataAtualizacao(preco.getDataAtualizacao())
                .userId(preco.getUser() != null ? preco.getUser().getId() : null)
                .build();
    }
}
