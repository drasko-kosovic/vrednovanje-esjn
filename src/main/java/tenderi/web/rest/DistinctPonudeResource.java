package tenderi.web.rest;

import java.util.List;
import java.util.Optional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import tech.jhipster.web.util.ResponseUtil;
import tenderi.domain.DistinctPonude;
import tenderi.repository.DistinctPonudeRepository;

@RestController
@RequestMapping("/api")
@Transactional
public class DistinctPonudeResource {

    private final Logger log = LoggerFactory.getLogger(DistinctPonudeResource.class);

    private final DistinctPonudeRepository distinctPonudeRepository;

    public DistinctPonudeResource(DistinctPonudeRepository distinctPonudeRepository) {
        this.distinctPonudeRepository = distinctPonudeRepository;
    }

    /**
     * {@code GET  /distinct-ponudes} : get all the distinctPonudes.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of distinctPonudes in body.
     */
    @GetMapping("/distinct-ponudes")
    public List<DistinctPonude> getAllDistinctPonudes() {
        log.debug("REST request to get all DistinctPonudes");
        return distinctPonudeRepository.findAll();
    }

    @GetMapping("/distinct/{sifra_postupka}")
    public List<DistinctPonude> getDistunctPostupak(@PathVariable Integer sifra_postupka) {
        return distinctPonudeRepository.findBySifraPostupka(sifra_postupka);
    }

    /**
     * {@code GET  /distinct-ponudes/:id} : get the "id" distinctPonude.
     *
     * @param id the id of the distinctPonude to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the distinctPonude, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/distinct-ponudes/{id}")
    public ResponseEntity<DistinctPonude> getDistinctPonude(@PathVariable Long id) {
        log.debug("REST request to get DistinctPonude : {}", id);
        Optional<DistinctPonude> distinctPonude = distinctPonudeRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(distinctPonude);
    }
}
