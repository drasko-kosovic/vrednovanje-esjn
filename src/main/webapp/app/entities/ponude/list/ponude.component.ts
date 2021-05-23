import { AfterViewInit, Component, Input, OnChanges, OnInit, ViewChild } from '@angular/core';

import { IPonude } from '../ponude.model';

import { PonudeService } from '../service/ponude.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PonudeDeleteDialogComponent } from 'app/entities/ponude/delete/ponude-delete-dialog.component';
import { Account } from 'app/core/auth/account.model';
import { Subscription } from 'rxjs';
import { AccountService } from 'app/core/auth/account.service';

@Component({
  selector: 'jhi-ponude',
  templateUrl: './ponude.component.html',
  styleUrls: ['./ponude.component.scss'],
})
export class PonudeComponent implements AfterViewInit, OnChanges, OnInit {
  ponudes?: IPonude[];
  account: Account | null = null;
  authSubscription?: Subscription;
  ukupnoProcijenjena?: number;
  ukupnaPonudjena?: number;
  nadji?: any;
  public displayedColumns = [
    'id',
    'sifra postupka',
    'sifra ponude',
    'broj partije',
    'naziv ponudjaca',
    'naziv proizvodjaca',
    'zasticeni naziv',
    'ponudjena vrijednost',
    'rok isporuke',
    'delete',
    'edit',
  ];

  public dataSource = new MatTableDataSource<IPonude>();

  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @Input() postupak?: any;
  constructor(
    protected ponudeService: PonudeService,
    protected activatedRoute: ActivatedRoute,
    protected router: Router,
    protected modalService: NgbModal,
    private accountService: AccountService
  ) {}

  public getSifraPostupka(): void {
    this.ponudeService.findSiftraPostupak(this.postupak).subscribe((res: IPonude[]) => {
      this.dataSource.data = res;
    });
  }
  delete(ponude: IPonude[]): void {
    const modalRef = this.modalService.open(PonudeDeleteDialogComponent, { backdrop: 'static' });
    modalRef.componentInstance.ponude = ponude;
    // unsubscribe not needed because closed completes on modal close
    modalRef.closed.subscribe((reason: string) => {
      if (reason === 'deleted') {
        this.getSifraPostupka();
      }
    });
  }

  public getAllPonude(): void {
    this.ponudeService.ponudeAll().subscribe((res: IPonude[]) => {
      this.dataSource.data = res;
      // eslint-disable-next-line no-console
      console.log(res);
    });
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }
  doFilter = (iznos: string): any => {
    this.dataSource.filter = iznos.trim().toLocaleLowerCase();
    this.ukupnaPonudjena = this.dataSource.filteredData.map(t => t.ponudjenaVrijednost).reduce((acc, value) => acc! + value!, 0);
  };

  ngOnChanges(): void {
    this.getSifraPostupka();
  }
  isAuthenticated(): boolean {
    return this.accountService.isAuthenticated();
  }

  ngOnInit(): void {
    this.authSubscription = this.accountService.getAuthenticationState().subscribe(account => (this.account = account));
  }
}
