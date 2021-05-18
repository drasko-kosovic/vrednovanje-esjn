import { AfterViewInit, Component, Input, OnChanges, OnInit, ViewChild } from '@angular/core';
import { IHvalePonude } from '../hvale-ponude.model';

import { HvalePonudeService } from '../service/hvale-ponude.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'jhi-hvale-ponude',
  templateUrl: './hvale-ponude.component.html',
  styleUrls: ['./hvale-ponude.component.scss'],
})
export class HvalePonudeComponent implements OnInit, AfterViewInit, OnChanges {
  hvalePonudes?: any;
  public displayedColumns = [
    'id',
    'sifra postupka',
    'broj partije',
    'inn',
    'farmaceutski oblik',
    'pakovanje',
    'kolicina',
    'procijenjena vrijednost',
  ];
  public dataSource = new MatTableDataSource<IHvalePonude>();
  sifraPostupka?: any;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @Input() postupak: any;
  constructor(protected hvaleService: HvalePonudeService) {}

  public getSifraPostupka(): void {
    this.hvaleService.hvali(this.postupak).subscribe((res: IHvalePonude[]) => {
      this.dataSource.data = res;
      // eslint-disable-next-line no-console
      console.log(res);
    });
  }

  public getAllHvali(): void {
    this.hvaleService.hvali(this.sifraPostupka).subscribe((res: IHvalePonude[]) => {
      this.dataSource.data = res;
      // eslint-disable-next-line no-console
      console.log(res);
    });
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }
  // getTotalCost(): any {
  //   return this.ponudes?.map(t => t.ponudjenaVrijednost).reduce((acc, value) => acc! + value!, 0);
  // }

  public doFilter = (value: string): any => {
    this.dataSource.filter = value.trim().toLocaleLowerCase();
  };

  ngOnChanges(): void {
    this.getSifraPostupka();
  }

  ngOnInit(): void {
    this.getAllHvali();
  }
}
