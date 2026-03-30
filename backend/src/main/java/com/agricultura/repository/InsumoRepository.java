package com.agricultura.repository;

import com.agricultura.domain.Insumo;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface InsumoRepository extends JpaRepository<Insumo, Long> {

    @EntityGraph(attributePaths = {"user"})
    List<Insumo> findByUserId(Long userId);

    @EntityGraph(attributePaths = {"user"})
    List<Insumo> findByUserIdAndAtivoTrue(Long userId);

    List<Insumo> findByUserIdAndQuantidadeLessThanEqual(Long userId, java.math.BigDecimal estoqueMinimo);
}
