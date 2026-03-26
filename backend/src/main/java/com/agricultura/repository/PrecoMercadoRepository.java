package com.agricultura.repository;

import com.agricultura.domain.PrecoMercado;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface PrecoMercadoRepository extends JpaRepository<PrecoMercado, Long> {
    List<PrecoMercado> findByProdutoContainingIgnoreCase(String produto);
}