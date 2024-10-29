import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatePetPostComponent } from './create-pet-post.component';

describe('CreatePetPostComponent', () => {
  let component: CreatePetPostComponent;
  let fixture: ComponentFixture<CreatePetPostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreatePetPostComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreatePetPostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
