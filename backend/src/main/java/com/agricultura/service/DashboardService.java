package com.agricultura.service;

import com.agricultura.dto.*;
import com.agricultura.repository.CulturaRepository;
import com.agricultura.repository.TarefaRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class DashboardService {

    private final CulturaRepository culturaRepository;
    private final TarefaRepository tarefaRepository;
    private final CulturaService culturaService;
    private final TarefaService tarefaService;

    @Transactional(readOnly = true)
    public DashboardResponse getResumo(Long userId) {
        List<CulturaResponse> culturas = culturaService.findAll(userId);
        List<TarefaResponse> tarefas = tarefaService.findAll(userId);

        long tarefasPendentes = tarefas.stream()
                .filter(t -> "PENDENTE".equals(t.getStatus()))
                .count();

        long tarefasEmAndamento = tarefas.stream()
                .filter(t -> "EM_ANDAMENTO".equals(t.getStatus()))
                .count();

        long tarefasConcluidas = tarefas.stream()
                .filter(t -> "CONCLUIDA".equals(t.getStatus()))
                .count();

        List<TarefaResponse> tarefasPendentesList = tarefas.stream()
                .filter(t -> "PENDENTE".equals(t.getStatus()) || "EM_ANDAMENTO".equals(t.getStatus()))
                .limit(5)
                .collect(Collectors.toList());

        return DashboardResponse.builder()
                .totalCulturas((long) culturas.size())
                .totalTarefas((long) tarefas.size())
                .tarefasPendentes(tarefasPendentes)
                .tarefasEmAndamento(tarefasEmAndamento)
                .tarefasConcluidas(tarefasConcluidas)
                .ultimasCulturas(culturas.stream().limit(6).collect(Collectors.toList()))
                .tarefasPendentesList(tarefasPendentesList)
                .build();
    }
}