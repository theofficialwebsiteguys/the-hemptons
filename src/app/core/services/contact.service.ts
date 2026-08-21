import { Injectable } from '@angular/core';
import { Observable, delay, of } from 'rxjs';
import { ContactSubmission } from '../models/contact.model';

/**
 * No contact-form backend exists yet. This resolves after a short delay so
 * the UI's success state is exercised end to end.
 * TODO: replace with a real POST once a contact endpoint exists (either on
 * the commerce API wrapper or a separate form-handling service).
 */
@Injectable({ providedIn: 'root' })
export class ContactService {
  submit(submission: ContactSubmission): Observable<void> {
    console.info('[ContactService] TODO: wire this up to a real endpoint.', submission);
    return of(undefined).pipe(delay(600));
  }
}
