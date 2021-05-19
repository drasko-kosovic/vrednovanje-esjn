import { AfterViewInit, Component, Input, OnChanges, ViewChild } from '@angular/core';
import { ISpecifikacije } from '../specifikacije.model';
import { SpecifikacijeService } from '../service/specifikacije.service';
import { IPonude } from 'app/entities/ponude/ponude.model';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SpecifikacijeDeleteDialogComponent } from 'app/entities/specifikacije/delete/specifikacije-delete-dialog.component';

@Component({
  selector: 'jhi-specifikacije',
  templateUrl: './specifikacije.component.html',
  styleUrls: ['./specifikacije.componenet.scss'],
})
export class SpecifikacijeComponent implements OnChanges, AfterViewInit {
  specifikacijes?: ISpecifikacije[];
  public displayedColumns = [
    'id',
    'sifra postupka',
    'sifra ponude',
    'broj partije',
    'atc',
    'inn',
    'farmaceutski oblik',
    'jacina lijeka',
    'kolicina',
    'pakovanje',
    'procijenjena vrijednost',
    'delete',
    'edit',
  ];

  public dataSource = new MatTableDataSource<IPonude>();

  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @Input() postupak: any;
  constructor(
    protected specifikacijeService: SpecifikacijeService,
    protected activatedRoute: ActivatedRoute,
    protected router: Router,
    protected modalService: NgbModal
  ) {}

  public getSifraPostupka(): void {
    this.specifikacijeService.findPostupak(this.postupak).subscribe((res: ISpecifikacije[]) => {
      this.dataSource.data = res;
      // eslint-disable-next-line no-console
      console.log(res);
    });
  }

  public getAllSpecifikacije(): void {
    this.specifikacijeService.query().subscribe((res: ISpecifikacije[]) => {
      this.dataSource.data = res;
      // eslint-disable-next-line no-console
      console.log(res);
    });
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  public doFilter = (value: string): any => {
    this.dataSource.filter = value.trim().toLocaleLowerCase();
  };

  ngOnChanges(): void {
    this.getSifraPostupka();
  }

  delete(specifikacije: ISpecifikacije[]): void {
    const modalRef = this.modalService.open(SpecifikacijeDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.ponude = specifikacije;
    // unsubscribe not needed because closed completes on modal close
    modalRef.closed.subscribe((reason: string) => {
      if (reason === 'deleted') {
        this.getSifraPostupka();
      }
    });
  }
}
