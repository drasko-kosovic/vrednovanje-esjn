import { Component, Input, OnChanges, OnInit, ViewChild } from '@angular/core';
import { ISpecifikacije } from '../specifikacije.model';
import { SpecifikacijeService } from '../service/specifikacije.service';
import { IPonude } from 'app/entities/ponude/ponude.model';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'jhi-specifikacije',
  templateUrl: './specifikacije.component.html',
  styleUrls: ['./specifikacije.componenet.scss'],
})
export class SpecifikacijeComponent implements OnChanges, OnInit {
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
  ];
  public dataSource = new MatTableDataSource<IPonude>();

  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @Input() postupak: any;
  constructor(protected specifikacijeService: SpecifikacijeService) {}

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

  // ngAfterViewInit(): void {
  //   this.dataSource.sort = this.sort;
  //   this.dataSource.paginator = this.paginator;
  // }

  public doFilter = (value: string): any => {
    this.dataSource.filter = value.trim().toLocaleLowerCase();
  };

  ngOnChanges(): void {
    this.getSifraPostupka();
  }

  ngOnInit(): void {
    this.getAllSpecifikacije();
  }
}
