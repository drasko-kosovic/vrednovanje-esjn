import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { IPonude } from 'app/entities/ponude/ponude.model';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { IPostupci } from 'app/entities/postupci/postupci.model';
import { PostupciService } from 'app/entities/postupci/service/postupci.service';

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

  public getAllPostupak(): void {
    this.postupciService.postupakAll().subscribe((res: IPonude[]) => {
      this.dataSource.data = res;
      // eslint-disable-next-line no-console
      console.log(res);
    });
  }
  ngOnInit(): void {
    this.getAllPostupak();
  }
  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  public doFilter = (value: string): any => {
    this.dataSource.filter = value.trim().toLocaleLowerCase();
  };
}
