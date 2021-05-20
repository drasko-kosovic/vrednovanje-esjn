package tenderi.repository;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import tenderi.domain.DistinctPonude;

/**
 * Spring Data SQL repository for the DistinctPonude entity.
 */
@SuppressWarnings("unused")
@Repository
public interface DistinctPonudeRepository extends JpaRepository<DistinctPonude, Long> {
    List<DistinctPonude> findBySifraPostupka(Integer sifraPostupka);
}
