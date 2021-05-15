import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'jhi-tender-home',
  templateUrl: './tender-home.component.html',
  styleUrls: ['./tender-home.component.scss'],
})
export class TenderHomeComponent implements OnInit {
  public sifra?: any;
  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.sifra = this.activatedRoute.snapshot.params.id;
  }
}
