import {AfterViewInit, Component, Input, OnChanges, ViewChild} from '@angular/core';

import { IPrvorangirani } from '../prvorangirani.model';
import { PrvorangiraniService } from 'app/entities/prvorangirani/service/prvorangirani.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'jhi-prvorangirani',
  templateUrl: './prvorangirani.component.html',
  styleUrls: ['./prvorangirani.component.scss'],
})
export class PrvorangiraniComponent implements OnChanges,AfterViewInit {
  prvorangiranis?: IPrvorangirani[];
  public displayedColumns = [
    'id',
    'sifra postupka',
    'sifra ponude',
    'broj partije',
    'atc',
    'inn',
    'zasticeni naziv',
    'farmaceutski oblik',
    'jacina lijeka',
    'pakovanje',
    'kolicina',
    'procijenjena vrijednost',
    'ponudjena vrijednost',
    'rok isporuke',
    'naziv ponudjaca',
  ];

  public dataSource = new MatTableDataSource<IPrvorangirani>();
  sifraPostupka?: any;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @Input() postupak: any;
  constructor(protected prvorangiraniService: PrvorangiraniService) {}

  public getAllPrvorangirani(): void {
    this.prvorangiraniService.prvorangiraniAll().subscribe((res: IPrvorangirani[]) => {
      this.dataSource.data = res;
      // eslint-disable-next-line no-console
      console.log(res);
    });
  }

  public getAllPrvorangiraniPostupak(): void {
    this.prvorangiraniService.findPostupak(this.postupak).subscribe((res: IPrvorangirani[]) => {
      this.dataSource.data = res;
      });
  }

  public doFilter = (value: string): any => {
    this.dataSource.filter = value.trim().toLocaleLowerCase();
  };

  ngOnChanges(): void {
    this.getAllPrvorangiraniPostupak();
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }
}
