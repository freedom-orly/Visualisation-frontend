import { AsyncPipe, DatePipe, NgForOf, NgIf } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import {
  type TuiComparator,
  TuiReorder,
  type TuiSortChange,
  TuiSortDirection,
  TuiTable,
  TuiTablePagination,
  type TuiTablePaginationEvent,
} from '@taiga-ui/addon-table';
import {
  TUI_DEFAULT_MATCHER,
  tuiControlValue,
  TuiDay,
  tuiDefaultSort,
  tuiIsFalsy,
  tuiIsPresent,
  TuiLet,
  TuiPopover,
  tuiToInt,
} from '@taiga-ui/cdk';
import { TuiAlertOptions, TuiAlertService, TuiButton, TuiDialogContext, TuiDialogService, TuiDropdown, TuiIcon, TuiLabel, TuiLoader, TuiNumberFormat, TuiTextfield, TuiTitle } from '@taiga-ui/core';
import { TuiCheckbox, TuiChevron, TuiInputNumber, TuiBreadcrumbs, TuiAvatar, TuiFileLike, TuiFiles, TuiTile, TuiStatus } from '@taiga-ui/kit';
import { injectContext, PolymorpheusComponent, PolymorpheusTemplate, type PolymorpheusContent } from '@taiga-ui/polymorpheus';
import {
  BehaviorSubject,
  catchError,
  combineLatest,
  debounceTime,
  filter,
  finalize,
  map,
  type Observable,
  of,
  share,
  startWith,
  Subject,
  switchMap,
  takeUntil,
  tap,
  timer,
} from 'rxjs';
import { VisualizationDTO } from '../../models/VisualizationDTO';
import { FilePage } from '../../models/FilePage';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { HttpService } from '../../http-service';
import { TuiCardLarge, TuiCell } from '@taiga-ui/layout';
import { FileDTO } from '../../models/FileDTO';
import e from 'express';
import { UpdateDto } from '../../models/updateDto';


const TODAY = TuiDay.currentLocal();

// const KEYS: Record<string, keyof FileDTO> = {
//   Name: 'name',

// };

function sortBy(key: keyof FileDTO, direction: TuiSortDirection): TuiComparator<FileDTO> {
  return (a, b) => direction * tuiDefaultSort(a[key], b[key]);
}


@Component({
  standalone: true,
  exportAs: "Example3",
  imports: [NgForOf, TuiButton],
  template: `
        <p>Do you want to delete this file?</p>
        <button
            *ngFor="let response of [true, false]"
            appearance="outline-grayscale"
            size="s"
            tuiButton
            type="button"
            class="tui-space_right-1"
            (click)="context.completeWith(response)"
        >
            {{ response ? 'Yes' : 'No' }}
        </button>
    `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AlertExample {
  protected readonly context =
    injectContext<TuiPopover<TuiAlertOptions<void>, boolean>>();
}


@Component({
  selector: 'app-upload-details',

  imports: [
    AsyncPipe,
    FormsModule,
    NgForOf,
    NgIf,
    ReactiveFormsModule,
    TuiButton,
    TuiCheckbox,
    TuiChevron,
    TuiDropdown,
    TuiInputNumber,
    TuiLabel,
    TuiLet,
    TuiLoader,
    TuiNumberFormat,
    TuiReorder,
    TuiTable,
    TuiTablePagination,
    TuiTextfield,
    TuiBreadcrumbs,
    RouterLink,
    TuiCell,
    TuiAvatar,
    TuiFiles,
    DatePipe,
    TuiCardLarge,
    TuiTitle,
    PolymorpheusTemplate,
    TuiIcon,
    TuiStatus
  ],
  templateUrl: './upload-details.html',
  styleUrl: './upload-details.less'
})
export class UploadDetails {



  readonly breadcrumbsItems = [
    {
      caption: 'Home',
      routerLink: '/'
    },
    {
      caption: 'Upload',
      routerLink: '/upload'
    },
    {
      caption: 'Details',
      routerLink: ''
    }
  ];
  protected updates: Observable<UpdateDto[]> | null = null;
  protected fileType: 'rscript' | 'datafile' = 'datafile';
  protected visualization: VisualizationDTO | null = null;
  protected filesPage: FilePage | null = null;
  protected selected = [];
  protected initial: readonly string[] = ['Name', 'Date of Birth', 'Age'];
  protected enabled = this.initial;
  protected columns = ['name', 'path', 'upload', 'actions'];
  protected dob = false;
  protected search = '';
  protected readonly control = new FormControl<File | null>(
    null,
    Validators.required,
  );
  protected dialogForm: FormGroup = new FormGroup({
    control: this.control,
  });



  private readonly size$ = new BehaviorSubject(10);
  protected readonly page$ = new BehaviorSubject(0);
  protected readonly failedFiles$ = new Subject<TuiFileLike | null>();
  protected readonly loadingFiles$ = new Subject<TuiFileLike | null>();
  protected readonly loadedFiles$ = this.control.valueChanges.pipe(
    switchMap((file) => this.processFile(file)),
  );

  itemToBeDeleted: any = null;
  private readonly alerts = inject(TuiAlertService); // 2 TuiAlertServices? What could go wrong?
  private readonly notification = this.alerts
    .open<boolean>(new PolymorpheusComponent(AlertExample), {
      data: this.itemToBeDeleted,
      label: 'Delete Confirmation',
      appearance: 'warning',
      autoClose: 0,
    })
    .pipe(
      switchMap((confirmed) => {
        if (confirmed && this.itemToBeDeleted) {
          return this.HttpService.deleteFile(this.itemToBeDeleted.id)
        }
        return of(null);
      }),
      map((response) => {
        if (response && response.success) {
          return this.tuiAlert.open('The file has been successfully deleted.', { label: 'Success!', appearance: 'positive' })
        } else if (response && !response.success) {
          return this.tuiAlert.open(`Unfortunetly we couldn't delete this file. ${response.message}`, { label: 'Something went wrong', appearance: 'negative' })
        }
        return of(null);
      }),
      catchError(() => this.tuiAlert.open('Unfortunetly we couldn\'t delete this file.', { label: 'Something went wrong', appearance: 'negative' })),
      takeUntil(inject(Router).events)
    );

  protected readonly request$ = combineLatest([
    this.page$,
    this.size$,
  ]).pipe(
    // zero time debounce for a case when both key and direction change
    debounceTime(0),
    switchMap((query) => {
      if (this.fileType === 'datafile') {
        return this.getFilesData(...query);
      } else {
        return this.getRScriptFilesData(...query);
      }
    }),
    share(),
  );

  protected readonly loading$ = this.request$.pipe(map(tuiIsFalsy));

  protected readonly total$ = this.request$.pipe(
    filter(tuiIsPresent),
    map(({ length }) => length),
    startWith(1),
  );

  data$: Observable<FileDTO[]> | null = null;
  // protected readonly data$: Observable<readonly FileDTO[]> = this.request$.pipe(
  //   filter(tuiIsPresent),
  //   map((users) => users.filter(tuiIsPresent)),
  //   startWith([]),
  // );

  constructor(private HttpService: HttpService, private route: ActivatedRoute, private tuiDialog: TuiDialogService, private tuiAlert: TuiAlertService) {
  }

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    const visualizationId = Number(this.route.snapshot.paramMap.get('id'));
    this.HttpService.getVisualizationById(visualizationId).subscribe((data) => {
      this.visualization = data;
    });
    this.updates = this.HttpService.getUpdatesForVisualization(visualizationId);

    this.route.pathFromRoot[1].url.subscribe(urlSegment => {
      if (urlSegment.length > 0) {
        if (urlSegment.at(-2)!.path === 'rscript') {
          this.fileType = 'rscript';
          this.data$ = this.getRScriptFilesData(0, 10)
        } else {
          this.fileType = 'datafile';
          this.data$ = this.getFilesData(0, 10)
        }
        this.breadcrumbsItems[2].caption = this.fileType === 'datafile' ? 'Data Files' : 'R Scripts';
      }
    });

  }

  deleteUpload(item: any) {
    this.itemToBeDeleted = item; // not the best practice, but ok for this case
    this.notification.subscribe(() => {
      this.data$ = this.fileType === 'datafile' ? this.getFilesData(this.page$.value, this.size$.value) : this.getRScriptFilesData(this.page$.value, this.size$.value);
    });
  }

  showUploadDialog(content: PolymorpheusContent<TuiDialogContext>) {
    this.tuiDialog.open(content).subscribe();
  }

  protected onPagination({ page, size }: TuiTablePaginationEvent): void {
    this.page$.next(page);
    this.size$.next(size);
  }

  protected isMatch(value: unknown): boolean {
    return !!this.search && TUI_DEFAULT_MATCHER(value, this.search);
  }

  protected removeFile(): void {
    this.control.setValue(null);
  }

  protected processFile(file: File | null): Observable<TuiFileLike | null> {
    this.failedFiles$.next(null);

    if (this.control.invalid || !file) {
      return of(null);
    }

    this.loadingFiles$.next(file);

    return timer(1000).pipe(
      map(() => {
        return file;
      }),
      finalize(() => this.loadingFiles$.next(null)),
    );
  }

  private getFilesData(
    page: number,
    size: number,
  ): Observable<FileDTO[]> {

    const start = page * size;
    const end = start + size;
    return this.HttpService.searchFiles({
      extension: this.search,
      visualization_id: Number(this.route.snapshot.paramMap.get('id')),
      start: 1,
      query: ''
    })
  }

  private getRScriptFilesData(
    page: number,
    size: number,
  ): Observable<FileDTO[]> {
    const start = page * size;
    const end = start + size;
    return this.HttpService.searchRScripts({
      extension: this.search,
      visualization_id: Number(this.route.snapshot.paramMap.get('id')),
      start: 1,
      query: ''
    })
  }

  submitUpload() {
    const file = this.control.value;
    if (file) {
      if (this.fileType === 'rscript') {
        this.HttpService.uploadRscriptFile(
          {
            file: file,
            visualizationId: Number(this.route.snapshot.paramMap.get('id'))
          }
        ).subscribe(
          {
            error: () => {
              this.tuiAlert.open('Unfortunetly we couldn\'t upload this file.', { label: 'Something went wrong', appearance: 'negative' })
                .subscribe();
              this.control.setValue(null);
            },
            complete: () => {
              this.tuiAlert.open('This file has been successfully uploaded!', { label: 'Success!', appearance: 'positive' })
                .subscribe();
              this.control.setValue(null);
            }
          }
        );
      }
      else {
        this.HttpService.uploadDataFile(
          {
            file: file,
            visualizationId: Number(this.route.snapshot.paramMap.get('id'))
          }
        ).subscribe({
          error: () => {
            this.tuiAlert.open('Unfortunetly we couldn\'t upload this file.', { label: 'Something went wrong', appearance: 'negative' })
              .subscribe();
            this.control.setValue(null);
          },
          complete: () => {
            this.tuiAlert.open('This file has been successfully uploaded!', { label: 'Success!', appearance: 'positive' })
              .subscribe();
            this.control.setValue(null);
          }

        }
        );
      }
    }
  }

  // protected readonly direction$ = new BehaviorSubject<TuiSortDirection>(
  //   TuiSortDirection.Desc,
  // );

  // protected readonly sortKey$ = new BehaviorSubject<keyof User>('name');

  // protected readonly minAge = new FormControl(21);
  // protected readonly minAge$ = tuiControlValue<number>(this.minAge).pipe(
  //   debounceTime(1000),
  //   tap(() => this.page$.next(0)),
  // );


  // protected onEnabled(enabled: readonly string[]): void {
  //   this.enabled = enabled;
  //   this.columns = this.initial
  //     .filter((column) => enabled.includes(column))
  //     .map((column) => KEYS[column] ?? '');
  // }



  // protected change({ sortKey, sortDirection }: TuiSortChange<User>): void {
  //   this.sortKey$.next(sortKey!);
  //   this.direction$.next(sortDirection);
  // }


}
