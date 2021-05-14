import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { IPonude } from 'app/entities/ponude/ponude.model';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { IPostupci, Postupci } from 'app/entities/postupci/postupci.model';
import { PostupciService } from 'app/entities/postupci/service/postupci.service';
import { HttpResponse } from '@angular/common/http';
import { IPonudjaci } from 'app/entities/ponudjaci/ponudjaci.model';

@Component({
  selector: 'jhi-postupci',
  templateUrl: './postupci.component.html',
  styleUrls: ['./postupci.component.scss'],
})
export class PostupciComponent implements OnInit, AfterViewInit {
  postupaks?: IPostupci[];
  public displayedColumns = ['id', 'sifra postupka', 'opis postupka', 'vrsta postupka', 'datum objave', 'broj tendera'];
  public dataSource = new MatTableDataSource<IPostupci>();

  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(protected postupciService: PostupciService) {}

  // public getAllPostupak(): void {
  //   this.postupciService.postupakAll().subscribe((res: IPonude[]) => {
  //     this.dataSource.data = res;
  //     // eslint-disable-next-line no-console
  //     console.log(res);
  //   });

  // }
  loadAll(): void {
    this.postupciService.query().subscribe((res: HttpResponse<IPostupci[]>) => {
      this.dataSource.data = res.body ?? [];
    });
  }

  ngOnInit(): void {
    this.loadAll();
  }
  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  public doFilter = (value: string): any => {
    this.dataSource.filter = value.trim().toLocaleLowerCase();
  };
}
