package com.agricultura.service;

import com.agricultura.domain.PrecoMercado;
import com.agricultura.dto.PrecoMercadoRequest;
import com.agricultura.dto.PrecoMercadoResponse;
import com.agricultura.repository.PrecoMercadoRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class PrecoMercadoService {

    private final PrecoMercadoRepository precoMercadoRepository;

    @Transactional(readOnly = true)
    public List<PrecoMercadoResponse> findAll() {
        return precoMercadoRepository.findAll().stream()
                .map(this::toResponse)
                .collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public PrecoMercadoResponse findById(Long id) {
        PrecoMercado preco = precoMercadoRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Preço de mercado não encontrado"));
        return toResponse(preco);
    }

    @Transactional
    public PrecoMercadoResponse create(PrecoMercadoRequest request) {
        PrecoMercado preco = PrecoMercado.builder()
                .produto(request.getProduto())
                .preco(request.getPreco())
                .unidade(request.getUnidade() != null ? request.getUnidade() : "sc")
                .variacao(request.getVariacao())
                .build();
        
        preco = precoMercadoRepository.save(preco);
        
        return toResponse(preco);
    }

    private PrecoMercadoResponse toResponse(PrecoMercado preco) {
        return PrecoMercadoResponse.builder()
                .id(preco.getId())
                .produto(preco.getProduto())
                .preco(preco.getPreco())
                .unidade(preco.getUnidade())
                .variacao(preco.getVariacao())
                .dataAtualizacao(preco.getDataAtualizacao())
                .build();
    }
}