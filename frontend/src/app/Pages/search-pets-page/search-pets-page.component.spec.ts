import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchPetsPageComponent } from './search-pets-page.component';

describe('SearchPetsPageComponent', () => {
  let component: SearchPetsPageComponent;
  let fixture: ComponentFixture<SearchPetsPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SearchPetsPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SearchPetsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
