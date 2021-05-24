package tenderi.service;

import java.io.ByteArrayInputStream;
import java.io.IOException;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import tenderi.domain.Ponude;
import tenderi.helper.ExcelHelper;
import tenderi.repository.PonudeRepository;

@Service
public class ExcelService {

    @Autowired
    PonudeRepository repository;

    public void save(MultipartFile file) {
        try {
            List<Ponude> ponudes = ExcelHelper.excelToTutorials(file.getInputStream());
            repository.saveAll(ponudes);
        } catch (IOException e) {
            throw new RuntimeException("fail to store excel data: " + e.getMessage());
        }
    }

    public ByteArrayInputStream load() {
        List<Ponude> ponudes = repository.findAll();

        ByteArrayInputStream in = ExcelHelper.tutorialsToExcel(ponudes);
        return in;
    }

    public List<Ponude> getAllTutorials() {
        return repository.findAll();
    }
}
