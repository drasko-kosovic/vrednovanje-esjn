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
import tenderi.domain.ViewVrednovanje;
import tenderi.repository.ViewVrednovanjeRepository;

/**
 * REST controller for managing {@link ViewVrednovanje}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class ViewVrednovanjeResource {

    private final Logger log = LoggerFactory.getLogger(ViewVrednovanjeResource.class);

    private final ViewVrednovanjeRepository viewVrednovanjeRepository;

    public ViewVrednovanjeResource(ViewVrednovanjeRepository viewVrednovanjeRepository) {
        this.viewVrednovanjeRepository = viewVrednovanjeRepository;
    }

    /**
     * {@code GET  /view-vrednovanjes} : get all the viewVrednovanjes.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of viewVrednovanjes in body.
     */
    @GetMapping("/view-vrednovanjes")
    public List<ViewVrednovanje> getAllViewVrednovanjes() {
        log.debug("REST request to get all ViewVrednovanjes");
        return viewVrednovanjeRepository.findAll();
    }

    /**
     * {@code GET  /view-vrednovanjes/:id} : get the "id" viewVrednovanje.
     *
     * @param id the id of the viewVrednovanje to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the viewVrednovanje, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/view-vrednovanjes/{id}")
    public ResponseEntity<ViewVrednovanje> getViewVrednovanje(@PathVariable Long id) {
        log.debug("REST request to get ViewVrednovanje : {}", id);
        Optional<ViewVrednovanje> viewVrednovanje = viewVrednovanjeRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(viewVrednovanje);
    }
}
