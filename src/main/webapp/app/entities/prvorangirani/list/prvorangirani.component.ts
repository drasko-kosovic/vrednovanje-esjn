import { Component, Input, OnInit, ViewChild } from '@angular/core';

import { IPrvorangirani } from '../prvorangirani.model';
import { PrvorangiraniService } from 'app/entities/prvorangirani/service/prvorangirani.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'jhi-prvorangirani',
  templateUrl: './prvorangirani.component.html',
})
export class PrvorangiraniComponent implements OnInit {
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

  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @Input() postupak: any;
  constructor(protected prvorangiraniService: PrvorangiraniService) {}
  ngOnInit(): void {
    this.getAllPrvorangirani();
  }
  public getAllPrvorangirani(): void {
    this.prvorangiraniService.prvorangiraniAll().subscribe((res: IPrvorangirani[]) => {
      this.dataSource.data = res;
      // eslint-disable-next-line no-console
      console.log(res);
    });
  }
}
