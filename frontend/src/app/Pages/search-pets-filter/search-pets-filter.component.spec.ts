import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchPetsFilterComponent } from './search-pets-filter.component';

describe('SearchPetsFilterComponent', () => {
  let component: SearchPetsFilterComponent;
  let fixture: ComponentFixture<SearchPetsFilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SearchPetsFilterComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SearchPetsFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
