import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuiztemplateComponent } from './quiztemplate.component';

describe('QuiztemplateComponent', () => {
  let component: QuiztemplateComponent;
  let fixture: ComponentFixture<QuiztemplateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QuiztemplateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(QuiztemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
