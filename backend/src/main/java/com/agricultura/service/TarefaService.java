package com.agricultura.service;

import com.agricultura.domain.Cultura;
import com.agricultura.domain.Tarefa;
import com.agricultura.domain.Usuario;
import com.agricultura.dto.TarefaRequest;
import com.agricultura.dto.TarefaResponse;
import com.agricultura.repository.CulturaRepository;
import com.agricultura.repository.TarefaRepository;
import com.agricultura.repository.UsuarioRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class TarefaService {

    private final TarefaRepository tarefaRepository;
    private final CulturaRepository culturaRepository;
    private final UsuarioRepository usuarioRepository;

    @Transactional(readOnly = true)
    public List<TarefaResponse> findAll(Long userId) {
        return tarefaRepository.findByUserId(userId).stream()
                .map(this::toResponse)
                .collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public TarefaResponse findById(Long id, Long userId) {
        Tarefa tarefa = tarefaRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Tarefa não encontrada"));
        
        if (!tarefa.getUser().getId().equals(userId)) {
            throw new RuntimeException("Acesso negado a esta tarefa");
        }
        
        return toResponse(tarefa);
    }

    @Transactional
    public TarefaResponse create(TarefaRequest request, Long userId) {
        Usuario usuario = usuarioRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("Usuário não encontrado"));
        
        Tarefa tarefa = Tarefa.builder()
                .titulo(request.getTitulo())
                .descricao(request.getDescricao())
                .prioridade(request.getPrioridade() != null ? request.getPrioridade() : "MEDIA")
                .status(request.getStatus() != null ? request.getStatus() : "PENDENTE")
                .dataVencimento(request.getDataVencimento())
                .user(usuario)
                .build();
        
        if (request.getCulturaId() != null) {
            Cultura cultura = culturaRepository.findById(request.getCulturaId())
                    .orElseThrow(() -> new RuntimeException("Cultura não encontrada"));
            tarefa.setCultura(cultura);
        }
        
        tarefa = tarefaRepository.save(tarefa);
        
        return toResponse(tarefa);
    }

    @Transactional
    public TarefaResponse update(Long id, TarefaRequest request, Long userId) {
        Tarefa tarefa = tarefaRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Tarefa não encontrada"));
        
        if (!tarefa.getUser().getId().equals(userId)) {
            throw new RuntimeException("Acesso negado a esta tarefa");
        }
        
        tarefa.setTitulo(request.getTitulo());
        tarefa.setDescricao(request.getDescricao());
        if (request.getPrioridade() != null) {
            tarefa.setPrioridade(request.getPrioridade());
        }
        if (request.getStatus() != null) {
            tarefa.setStatus(request.getStatus());
        }
        tarefa.setDataVencimento(request.getDataVencimento());
        
        if (request.getCulturaId() != null) {
            Cultura cultura = culturaRepository.findById(request.getCulturaId())
                    .orElseThrow(() -> new RuntimeException("Cultura não encontrada"));
            tarefa.setCultura(cultura);
        } else {
            tarefa.setCultura(null);
        }
        
        tarefa = tarefaRepository.save(tarefa);
        
        return toResponse(tarefa);
    }

    @Transactional
    public void delete(Long id, Long userId) {
        Tarefa tarefa = tarefaRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Tarefa não encontrada"));
        
        if (!tarefa.getUser().getId().equals(userId)) {
            throw new RuntimeException("Acesso negado a esta tarefa");
        }
        
        tarefaRepository.delete(tarefa);
    }

    private TarefaResponse toResponse(Tarefa tarefa) {
        return TarefaResponse.builder()
                .id(tarefa.getId())
                .titulo(tarefa.getTitulo())
                .descricao(tarefa.getDescricao())
                .prioridade(tarefa.getPrioridade())
                .status(tarefa.getStatus())
                .dataVencimento(tarefa.getDataVencimento())
                .culturaId(tarefa.getCultura() != null ? tarefa.getCultura().getId() : null)
                .culturaNome(tarefa.getCultura() != null ? tarefa.getCultura().getNome() : null)
                .userId(tarefa.getUser().getId())
                .createdAt(tarefa.getCreatedAt())
                .updatedAt(tarefa.getUpdatedAt())
                .build();
    }
}