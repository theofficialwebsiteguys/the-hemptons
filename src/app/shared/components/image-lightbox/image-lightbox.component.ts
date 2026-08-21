import { DOCUMENT } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  effect,
  inject,
  input,
  output,
  viewChild
} from '@angular/core';
import { ProductImage } from '../../../core/models/image.model';
import { ImageComponent } from '../image/image.component';
import { IconComponent } from '../icon/icon.component';

/**
 * A minimal, self-contained fullscreen gallery viewer — no external
 * dependency. Renders only while `open()` is true; the parent owns the
 * active index so thumbnails and the lightbox always agree.
 */
@Component({
  selector: 'app-image-lightbox',
  standalone: true,
  imports: [ImageComponent, IconComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './image-lightbox.component.html',
  styleUrl: './image-lightbox.component.scss'
})
export class ImageLightboxComponent {
  readonly images = input.required<ProductImage[]>();
  readonly activeIndex = input(0);
  readonly title = input('');
  readonly open = input(false);

  readonly close = output<void>();
  readonly indexChange = output<number>();

  private readonly closeButton = viewChild<ElementRef<HTMLButtonElement>>('closeButton');

  private readonly document = inject(DOCUMENT);
  private lastFocused: HTMLElement | null = null;

  constructor() {
    effect(() => {
      if (this.open()) {
        this.lastFocused = (this.document.activeElement as HTMLElement) ?? null;
        this.document.body.style.overflow = 'hidden';
        queueMicrotask(() => this.closeButton()?.nativeElement.focus());
      } else {
        this.document.body.style.overflow = '';
        this.lastFocused?.focus();
      }
    });
  }

  onKeydown(event: KeyboardEvent): void {
    if (event.key === 'Escape') {
      event.preventDefault();
      this.close.emit();
    } else if (event.key === 'ArrowLeft') {
      event.preventDefault();
      this.previous();
    } else if (event.key === 'ArrowRight') {
      event.preventDefault();
      this.next();
    }
  }

  previous(): void {
    const count = this.images().length;
    if (!count) return;
    this.indexChange.emit((this.activeIndex() - 1 + count) % count);
  }

  next(): void {
    const count = this.images().length;
    if (!count) return;
    this.indexChange.emit((this.activeIndex() + 1) % count);
  }
}
