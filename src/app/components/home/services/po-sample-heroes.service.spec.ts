import { TestBed } from '@angular/core/testing';
import { SamplePoMultiselectHeroesService } from './po-sample-heroes.service';



describe('PoSampleHeroesServiceTsService', () => {
  let service: SamplePoMultiselectHeroesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SamplePoMultiselectHeroesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
