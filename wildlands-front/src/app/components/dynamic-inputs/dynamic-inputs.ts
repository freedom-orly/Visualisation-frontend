import { AsyncPipe, NgFor, NgForOf, NgIf, NgComponentOutlet } from '@angular/common';
import { Component, EventEmitter, input, Input, Output, signal, Signal, WritableSignal } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { TuiTable } from '@taiga-ui/addon-table';
import { TuiDay, TuiItem } from '@taiga-ui/cdk';
import { TuiButton, TuiFormatNumberPipe, TuiLink, TuiTitle, TuiTextfieldComponent, TuiCalendar, TuiTextfield, TuiLoader, TuiIcon, TuiAppearance, TuiSelectLike, TuiDataList, tuiDateFormatProvider } from '@taiga-ui/core';
import { TuiAccordionDirective, TuiAccordionItem, TuiBreadcrumbs, TuiDataListWrapper, TuiDataListWrapperComponent, TuiInputChip, TuiInputDate, tuiInputDateOptionsProviderNew, TuiMultiSelect, TuiSelect, TuiInputNumberDirective } from '@taiga-ui/kit/components';
import { TuiCardLarge, TuiCell, TuiHeader, TuiSubheaderComponent } from '@taiga-ui/layout';
import { LinkButton } from '../../components/link-button/link-button';
import { HttpService } from '../../http-service';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { catchError, combineLatest, last, map, Observable, of, Subject } from 'rxjs';
import { response } from 'express';
import { VisualizationInputFieldDTO } from '../../models/VisualizationInputDTO';
import { HttpClient } from '@angular/common/http';
import { TuiChevron, TuiFilterByInputPipe, TuiHideSelectedPipe } from '@taiga-ui/kit';
import { Sign } from 'crypto';

@Component({
  selector: 'app-dynamic-inputs',
  imports: [
    TuiBreadcrumbs,
    RouterModule,
    TuiItem,
    TuiLink,
    TuiAccordionDirective,
    TuiAccordionItem,
    TuiHeader,
    TuiTitle,
    TuiSubheaderComponent,
    TuiCell,
    TuiCardLarge,
    AsyncPipe,
    TuiFormatNumberPipe,
    TuiTable,
    NgFor,
    TuiAccordionItem,
    NgForOf,
    TuiButton,
    LinkButton,
    TuiTextfieldComponent,
    TuiCalendar,
    FormsModule,
    TuiDataListWrapperComponent,
    TuiSelect,
    TuiTextfield,
    TuiInputDate,
    NgIf, TuiLoader, TuiIcon, TuiAppearance, ReactiveFormsModule,
    TuiDataListWrapper,
    TuiTextfield,
    TuiInputChip,
    TuiMultiSelect,
    TuiSelectLike,
    TuiFilterByInputPipe,
    TuiHideSelectedPipe,
    NgComponentOutlet,
    TuiDataList,
    TuiChevron,
    TuiInputNumberDirective
],
  providers: [tuiInputDateOptionsProviderNew({
    valueTransformer: {
      toControlValue: (item: TuiDay | null): string | null => item?.toUtcNativeDate().toISOString().split('T')[0] || null,
      fromControlValue: (value: string | null): TuiDay | null => value ? TuiDay.fromLocalNativeDate(new Date(value)) : null
    }
  })],
  templateUrl: './dynamic-inputs.html',
  styleUrl: './dynamic-inputs.less'
})
export class DynamicInputs {
  @Input() inputFields: VisualizationInputFieldDTO[] | undefined = undefined;
  @Input() visualizationId: number | null = null;
  @Output() SubmitForm: EventEmitter<FormGroup> = new EventEmitter<FormGroup>();
  @Input() formReady: Subject<FormGroup> | null = null;
  inputFields$: Observable<VisualizationInputFieldDTO[]> | null = null;
  protected multi: [string[]] = [[]];
  formGroup: FormGroup = new FormGroup({});

  constructor(private httpService: HttpService) { 

  }

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    if (this.inputFields) {
      this.inputFields.forEach(input => {
        if (input.field_type === 'select' && !input.options) {
          input.options = [];
        }
      });
      this.inputFields.forEach(field => {
        const validators = field.required ? [Validators.required] : [];
        this.formGroup.addControl(field.field_name, new FormControl(field.default_value || '', validators));
      });
      return;
    }

    if (this.visualizationId) {
      this.inputFields$ = this.httpService.getVisualizationInputFields(this.visualizationId).pipe(
        map(fields => {
          fields.forEach(input => {
            if (input.field_type === 'select' && !input.options) {
              input.options = [];
            }
            if (input.field_type === 'selectMulti') {
              this.multi.push([]);
            }
          });

          fields.forEach(field => {
            const validators = field.required ? [Validators.required] : [];
            this.formGroup.addControl(field.field_name, new FormControl(field.default_value || '', validators));
          });
          return fields;
        })
      );
      
      if (this.formReady) {
        this.formReady.next(this.formGroup);
      }
      return;
    }

    throw new Error('Either inputFields or visualizationId must be provided.');

  }

  UpdateChart() {
    this.SubmitForm.emit(this.formGroup);
  }

}
