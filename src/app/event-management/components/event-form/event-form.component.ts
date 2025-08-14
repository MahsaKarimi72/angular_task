import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
} from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { EventItem } from '../../models/event.model';
import { NzUploadFile } from 'ng-zorro-antd/upload';
import { from } from 'rxjs';

@Component({
  selector: 'app-event-form',
  templateUrl: './event-form.component.html',
  standalone: false,
})
export class EventFormComponent implements OnChanges {
  @Input() value?: EventItem | null;
  @Output() submitForm = new EventEmitter<Partial<EventItem>>();

  timezones = ['UTC', 'Europe/Warsaw', 'America/New_York', 'Asia/Tehran'];
  uploadingPrimary = false;
  uploadingCover = false;

  // Explicitly type the form
  form: FormGroup<{
    title: FormControl<string | null>;
    description: FormControl<string | null>;
    startDateTime: FormControl<Date | null>;
    endDateTime: FormControl<Date | null>;
    timezone: FormControl<string | null>;
    venueName: FormControl<string | null>;
    isPublic: FormControl<boolean | null>;
    primaryImageDataUrl: FormControl<string | null>;
    coverImageDataUrl: FormControl<string | null>;
  }>;

  constructor(private fb: FormBuilder) {
    this.form = new FormGroup({
      title: new FormControl<string | null>(null, Validators.required),
      description: new FormControl<string | null>(null),
      startDateTime: new FormControl<Date | null>(null, Validators.required),
      endDateTime: new FormControl<Date | null>(null, Validators.required),
      timezone: new FormControl<string | null>('UTC', Validators.required),
      venueName: new FormControl<string | null>(null),
      isPublic: new FormControl<boolean | null>(true),
      primaryImageDataUrl: new FormControl<string | null>(null),
      coverImageDataUrl: new FormControl<string | null>(null),
    });
  }

  ngOnChanges(): void {
    if (this.value) {
      this.form.patchValue({
        title: this.value.title,
        description: this.value.description,
        startDateTime: new Date(this.value.startDateTime),
        endDateTime: new Date(this.value.endDateTime),
        timezone: this.value.timezone || 'UTC',
        venueName: this.value.venue?.venueName || '',
        isPublic: this.value.isPublic ?? true,
        primaryImageDataUrl: this.value.primaryImageDataUrl || '',
        coverImageDataUrl: this.value.coverImageDataUrl || '',
      });
    }
  }

  private toBase64(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(String(reader.result));
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  }

  onPrimaryChange = (file: NzUploadFile, fileList: NzUploadFile[]) => {
    this.uploadingPrimary = true;
    return from(
      this.toBase64(file as unknown as File).then((b64) => {
        this.form.patchValue({ primaryImageDataUrl: b64 });
        this.uploadingPrimary = false;
        return false; // prevent default upload
      })
    );
  };

  // Cover image
  onCoverChange = (file: NzUploadFile, fileList: NzUploadFile[]) => {
    this.uploadingCover = true;
    return from(
      this.toBase64(file as unknown as File).then((b64) => {
        this.form.patchValue({ coverImageDataUrl: b64 });
        this.uploadingCover = false;
        return false; // prevent default upload
      })
    );
  };

  submit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    const v = this.form.value;
    if (
      new Date(v.startDateTime!).getTime() >= new Date(v.endDateTime!).getTime()
    ) {
      alert('End time must be after start time');
      return;
    }
    this.submitForm.emit({
      title: v.title!,
      description: v.description || '',
      startDateTime: new Date(v.startDateTime!).toISOString(),
      endDateTime: new Date(v.endDateTime!).toISOString(),
      timezone: v.timezone!,
      isPublic: !!v.isPublic,
      primaryImageDataUrl: v.primaryImageDataUrl || '',
      coverImageDataUrl: v.coverImageDataUrl || '',
      venue: v.venueName
        ? {
            id: 'v-' + crypto.randomUUID(),
            venueName: v.venueName,
            address1: '',
            city: '',
            state: '',
            country: '',
            postalZip: '',
          }
        : undefined,
    });
  }
}
