import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VisualizationDetails } from './visualization-details';

describe('VisualizationDetails', () => {
  let component: VisualizationDetails;
  let fixture: ComponentFixture<VisualizationDetails>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VisualizationDetails]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VisualizationDetails);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
