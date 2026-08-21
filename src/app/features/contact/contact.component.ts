import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

import { ContactService } from '../../core/services/contact.service';
import { SeoService } from '../../core/seo/seo.service';
import { SITE_CONFIG } from '../../config/site.config';
import { ButtonComponent } from '../../shared/components/button/button.component';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [ReactiveFormsModule, ButtonComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss'
})
export class ContactComponent {
  private readonly fb = new FormBuilder();
  private readonly contactService = inject(ContactService);
  private readonly seo = inject(SeoService);

  protected readonly site = SITE_CONFIG;

  protected readonly form = this.fb.nonNullable.group({
    name: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    phone: [''],
    message: ['', [Validators.required, Validators.minLength(10)]]
  });

  protected readonly submitting = signal(false);
  protected readonly submitted = signal(false);

  constructor() {
    this.seo.update({ title: 'Contact', path: '/contact' });
  }

  submit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.submitting.set(true);
    this.contactService.submit(this.form.getRawValue()).subscribe(() => {
      this.submitting.set(false);
      this.submitted.set(true);
      this.form.reset();
    });
  }
}
