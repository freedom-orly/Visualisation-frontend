import { AsyncPipe, NgForOf, NgIf } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
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
  tuiToInt,
} from '@taiga-ui/cdk';
import {
  TuiButton,
  TuiDialogContext,
  TuiDialogService,
  TuiDropdown,
  TuiLabel,
  TuiLoader,
  TuiNumberFormat,
  TuiTextfield,
} from '@taiga-ui/core';
import { TuiCheckbox, TuiChevron, TuiInputNumber, TuiBreadcrumbs, TuiAvatar, TuiFileLike, TuiFiles } from '@taiga-ui/kit';
import { type PolymorpheusContent } from '@taiga-ui/polymorpheus';
import {
  BehaviorSubject,
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
  tap,
  timer,
} from 'rxjs';
import { VisualizationDTO } from '../../models/VisualizationDTO';
import { FilePage } from '../../models/FilePage';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { HttpService } from '../../http-service';
import { TuiCell } from '@taiga-ui/layout';
import { FileDTO } from '../../models/FileDTO';
import e from 'express';


const TODAY = TuiDay.currentLocal();

// const KEYS: Record<string, keyof FileDTO> = {
//   Name: 'name',

// };

function sortBy(key: keyof FileDTO, direction: TuiSortDirection): TuiComparator<FileDTO> {
  return (a, b) => direction * tuiDefaultSort(a[key], b[key]);
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
    TuiFiles
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
  protected fileType: 'rscript' | 'datafile' = 'datafile';
  protected visualization: VisualizationDTO | null = null;
  protected filesPage: FilePage | null = null;
  protected selected = [];
  protected initial: readonly string[] = ['Name', 'Date of Birth', 'Age'];
  protected enabled = this.initial;
  protected columns = ['name', 'path', 'upload'];
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

  protected readonly data$: Observable<readonly FileDTO[]> = this.request$.pipe(
    filter(tuiIsPresent),
    map((users) => users.filter(tuiIsPresent)),
    startWith([]),
  );

  constructor(private HttpService: HttpService, private route: ActivatedRoute, private tuiDialog: TuiDialogService) {
    this.route.pathFromRoot[1].url.subscribe(urlSegment => {
      if (urlSegment.length > 0) {
        if (urlSegment.at(-2)!.path === 'rscript') {
          this.fileType = 'rscript';
        } else {
          this.fileType = 'datafile';
        }
        this.breadcrumbsItems[2].caption = this.fileType === 'datafile' ? 'Data Files' : 'R Scripts';
      }
    });

  }

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    const visualizationId = Number(this.route.snapshot.paramMap.get('id'));
    this.HttpService.getVisualizationById(visualizationId).subscribe((data) => {
      this.visualization = data;
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
        if (Math.random() > 0.5) {
          return file;
        }

        this.failedFiles$.next(file);

        return null;
      }),
      finalize(() => this.loadingFiles$.next(null)),
    );
  }

  private getFilesData(
    page: number,
    size: number,
  ): Observable<ReadonlyArray<FileDTO | null>> {

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
  ): Observable<ReadonlyArray<FileDTO | null>> {
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
        ).subscribe(() => {
          this.control.setValue(null);
        });
      }
      else {
        this.HttpService.uploadDataFile(
          {
            file: file,
            visualizationId: Number(this.route.snapshot.paramMap.get('id'))
          }
        ).subscribe(() => {
          this.control.setValue(null);
        });
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
