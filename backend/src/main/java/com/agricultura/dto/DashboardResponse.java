package com.agricultura.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class DashboardResponse {
    private Long totalCulturas;
    private Long totalTarefas;
    private Long tarefasPendentes;
    private Long tarefasEmAndamento;
    private Long tarefasConcluidas;
    private List<CulturaResponse> ultimasCulturas;
    private List<TarefaResponse> tarefasPendentesList;
}