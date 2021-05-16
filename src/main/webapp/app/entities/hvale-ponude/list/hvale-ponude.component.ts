import { Component, Inject, OnInit } from '@angular/core';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { combineLatest } from 'rxjs';

import { IHvalePonude } from '../hvale-ponude.model';

import { ITEMS_PER_PAGE } from 'app/config/pagination.constants';
import { HvalePonudeService } from '../service/hvale-ponude.service';
import { DOCUMENT } from '@angular/common';
import { SERVER_API_URL } from 'app/app.constants';

@Component({
  selector: 'jhi-hvale-ponude',
  templateUrl: './hvale-ponude.component.html',
})
export class HvalePonudeComponent implements OnInit {
  hvalePonudes?: any;
  isLoading = false;
  totalItems = 0;
  itemsPerPage = ITEMS_PER_PAGE;
  page?: number;
  predicate!: string;
  ascending!: boolean;
  ngbPaginationPage = 1;
  sifraPosupka? = 456;
  public resourceUrlExel = SERVER_API_URL + 'api/excel-hvali/download/';
  constructor(
    protected hvalePonudeService: HvalePonudeService,
    protected activatedRoute: ActivatedRoute,
    protected router: Router,
    @Inject(DOCUMENT) private document: Document
  ) {}

  public exel(): void {
    this.document.location.href = this.resourceUrlExel + String(this.sifraPosupka);
  }
  ngOnInit(): void {
    this.getAllHvale();
  }
  loadPage(page?: number, dontNavigate?: boolean): void {
    this.isLoading = true;
    const pageToLoad: number = page ?? this.page ?? 1;

    this.hvalePonudeService
      .query({
        page: pageToLoad - 1,
        size: this.itemsPerPage,
        sort: this.sort(),
      })
      .subscribe(
        (res: HttpResponse<IHvalePonude[]>) => {
          this.isLoading = false;
          this.onSuccess(res.body, res.headers, pageToLoad, !dontNavigate);
        },
        () => {
          this.isLoading = false;
          this.onError();
        }
      );
  }
  public getAllHvale(): any {
    this.hvalePonudeService.hvali(456).subscribe((res: any) => {
      this.hvalePonudes = res;
    });
  }

  trackId(index: number, item: IHvalePonude): number {
    return item.id!;
  }

  protected sort(): string[] {
    const result = [this.predicate + ',' + (this.ascending ? 'asc' : 'desc')];
    if (this.predicate !== 'id') {
      result.push('id');
    }
    return result;
  }

  protected handleNavigation(): void {
    combineLatest([this.activatedRoute.data, this.activatedRoute.queryParamMap]).subscribe(([data, params]) => {
      const page = params.get('page');
      const pageNumber = page !== null ? +page : 1;
      const sort = (params.get('sort') ?? data['defaultSort']).split(',');
      const predicate = sort[0];
      const ascending = sort[1] === 'asc';
      if (pageNumber !== this.page || predicate !== this.predicate || ascending !== this.ascending) {
        this.predicate = predicate;
        this.ascending = ascending;
        this.loadPage(pageNumber, true);
      }
    });
  }

  protected onSuccess(data: IHvalePonude[] | null, headers: HttpHeaders, page: number, navigate: boolean): void {
    this.totalItems = Number(headers.get('X-Total-Count'));
    this.page = page;
    if (navigate) {
      this.router.navigate(['/hvale-ponude'], {
        queryParams: {
          page: this.page,
          size: this.itemsPerPage,
          sort: this.predicate + ',' + (this.ascending ? 'asc' : 'desc'),
        },
      });
    }
    this.hvalePonudes = data ?? [];
    this.ngbPaginationPage = this.page;
  }

  protected onError(): void {
    this.ngbPaginationPage = this.page ?? 1;
  }
}
