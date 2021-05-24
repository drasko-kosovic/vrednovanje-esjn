package tenderi.helper;

import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;
import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.ss.usermodel.Workbook;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.web.multipart.MultipartFile;
import tenderi.domain.Ponude;

public class ExcelHelper {

    public static String TYPE = "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";
    static String[] HEADERs = {
        "Id",
        "Sifra Ponude",
        "Sifra Postupka",
        "Broj Partije",
        "Naziv Ponudjaca",
        "Naziv Proizvodjaca",
        "Zasticeni Naziv",
        "Ponudjena Vrijednost",
        "Rok Isporuke",
    };
    static String SHEET = "Ponude";

    public static boolean hasExcelFormat(MultipartFile file) {
        if (!TYPE.equals(file.getContentType())) {
            return false;
        }

        return true;
    }

    public static ByteArrayInputStream tutorialsToExcel(List<Ponude> ponudes) {
        try (Workbook workbook = new XSSFWorkbook(); ByteArrayOutputStream out = new ByteArrayOutputStream();) {
            Sheet sheet = workbook.createSheet(SHEET);

            // Header
            Row headerRow = sheet.createRow(0);

            for (int col = 0; col < HEADERs.length; col++) {
                Cell cell = headerRow.createCell(col);
                cell.setCellValue(HEADERs[col]);
            }

            int rowIdx = 1;
            for (Ponude ponude : ponudes) {
                Row row = sheet.createRow(rowIdx++);

                row.createCell(0).setCellValue(ponude.getId());
                row.createCell(1).setCellValue(ponude.getSifraPostupka());
                row.createCell(2).setCellValue(ponude.getSifraPonude());
                row.createCell(3).setCellValue(ponude.getBrojPartije());

                row.createCell(4).setCellValue(ponude.getNazivPonudjaca());
                row.createCell(5).setCellValue(ponude.getNazivProizvodjaca());
                row.createCell(6).setCellValue(ponude.getZastceniNaziv());
                row.createCell(7).setCellValue(ponude.getPonudjenaVrijednost());
                row.createCell(8).setCellValue(ponude.getRokIsporuke());
            }

            workbook.write(out);
            return new ByteArrayInputStream(out.toByteArray());
        } catch (IOException e) {
            throw new RuntimeException("fail to import data to Excel file: " + e.getMessage());
        }
    }

    public static List<Ponude> excelToTutorials(InputStream is) {
        try {
            Workbook workbook = new XSSFWorkbook(is);

            Sheet sheet = workbook.getSheet(SHEET);
            Iterator<Row> rows = sheet.iterator();

            List<Ponude> ponudes = new ArrayList<Ponude>();

            int rowNumber = 0;
            while (rows.hasNext()) {
                Row currentRow = rows.next();

                // skip header
                if (rowNumber == 0) {
                    rowNumber++;
                    continue;
                }

                Iterator<Cell> cellsInRow = currentRow.iterator();

                Ponude ponude = new Ponude();

                int cellIdx = 0;
                while (cellsInRow.hasNext()) {
                    Cell currentCell = cellsInRow.next();

                    switch (cellIdx) {
                        case 0:
                            ponude.setId((long) currentCell.getNumericCellValue());
                            break;
                        case 1:
                            ponude.setSifraPostupka((int) currentCell.getNumericCellValue());
                            break;
                        case 2:
                            ponude.setSifraPonude((int) currentCell.getNumericCellValue());
                            break;
                        case 3:
                            ponude.setBrojPartije((int) currentCell.getNumericCellValue());
                            break;
                        case 4:
                            ponude.setNazivProizvodjaca(currentCell.getStringCellValue());
                            break;
                        case 5:
                            ponude.setNazivProizvodjaca(currentCell.getStringCellValue());
                            break;
                        case 6:
                            ponude.setZastceniNaziv(currentCell.getStringCellValue());
                            break;
                        case 7:
                            ponude.setPonudjenaVrijednost(currentCell.getNumericCellValue());
                            break;
                        case 8:
                            ponude.setRokIsporuke((int) currentCell.getNumericCellValue());
                            break;
                        default:
                            break;
                    }

                    cellIdx++;
                }

                ponudes.add(ponude);
            }

            workbook.close();

            return ponudes;
        } catch (IOException e) {
            throw new RuntimeException("fail to parse Excel file: " + e.getMessage());
        }
    }
}
