jest.mock('@angular/router');

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { of, Subject } from 'rxjs';

import { PonudeService } from '../service/ponude.service';
import { IPonude, Ponude } from '../ponude.model';

import { PonudeUpdateComponent } from './ponude-update.component';

describe('Component Tests', () => {
  describe('Ponude Management Update Component', () => {
    let comp: PonudeUpdateComponent;
    let fixture: ComponentFixture<PonudeUpdateComponent>;
    let activatedRoute: ActivatedRoute;
    let ponudeService: PonudeService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        declarations: [PonudeUpdateComponent],
        providers: [FormBuilder, ActivatedRoute],
      })
        .overrideTemplate(PonudeUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(PonudeUpdateComponent);
      activatedRoute = TestBed.inject(ActivatedRoute);
      ponudeService = TestBed.inject(PonudeService);

      comp = fixture.componentInstance;
    });

    describe('ngOnInit', () => {
      it('Should update editForm', () => {
        const ponude: IPonude = { id: 456 };

        activatedRoute.data = of({ ponude });
        comp.ngOnInit();

        expect(comp.editForm.value).toEqual(expect.objectContaining(ponude));
      });
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', () => {
        // GIVEN
        const saveSubject = new Subject();
        const ponude = { id: 123 };
        spyOn(ponudeService, 'update').and.returnValue(saveSubject);
        spyOn(comp, 'previousState');
        activatedRoute.data = of({ ponude });
        comp.ngOnInit();

        // WHEN
        comp.save();
        expect(comp.isSaving).toEqual(true);
        saveSubject.next(new HttpResponse({ body: ponude }));
        saveSubject.complete();

        // THEN
        expect(comp.previousState).toHaveBeenCalled();
        expect(ponudeService.update).toHaveBeenCalledWith(ponude);
        expect(comp.isSaving).toEqual(false);
      });

      it('Should call create service on save for new entity', () => {
        // GIVEN
        const saveSubject = new Subject();
        const ponude = new Ponude();
        spyOn(ponudeService, 'create').and.returnValue(saveSubject);
        spyOn(comp, 'previousState');
        activatedRoute.data = of({ ponude });
        comp.ngOnInit();

        // WHEN
        comp.save();
        expect(comp.isSaving).toEqual(true);
        saveSubject.next(new HttpResponse({ body: ponude }));
        saveSubject.complete();

        // THEN
        expect(ponudeService.create).toHaveBeenCalledWith(ponude);
        expect(comp.isSaving).toEqual(false);
        expect(comp.previousState).toHaveBeenCalled();
      });

      it('Should set isSaving to false on error', () => {
        // GIVEN
        const saveSubject = new Subject();
        const ponude = { id: 123 };
        spyOn(ponudeService, 'update').and.returnValue(saveSubject);
        spyOn(comp, 'previousState');
        activatedRoute.data = of({ ponude });
        comp.ngOnInit();

        // WHEN
        comp.save();
        expect(comp.isSaving).toEqual(true);
        saveSubject.error('This is an error!');

        // THEN
        expect(ponudeService.update).toHaveBeenCalledWith(ponude);
        expect(comp.isSaving).toEqual(false);
        expect(comp.previousState).not.toHaveBeenCalled();
      });
    });
  });
});
