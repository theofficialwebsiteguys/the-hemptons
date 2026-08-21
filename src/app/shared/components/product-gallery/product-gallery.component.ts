import { ChangeDetectionStrategy, Component, computed, input, signal } from '@angular/core';
import { ProductImage } from '../../../core/models/image.model';
import { ImageComponent } from '../image/image.component';
import { IconComponent } from '../icon/icon.component';
import { ImageLightboxComponent } from '../image-lightbox/image-lightbox.component';

@Component({
  selector: 'app-product-gallery',
  standalone: true,
  imports: [ImageComponent, IconComponent, ImageLightboxComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './product-gallery.component.html',
  styleUrl: './product-gallery.component.scss'
})
export class ProductGalleryComponent {
  readonly images = input.required<ProductImage[]>();
  readonly title = input('');

  private readonly activeIndexSignal = signal(0);
  protected readonly lightboxOpen = signal(false);

  readonly activeIndex = computed(() => Math.min(this.activeIndexSignal(), Math.max(this.images().length - 1, 0)));
  readonly activeImage = computed(() => this.images()[this.activeIndex()] ?? null);

  select(index: number): void {
    this.activeIndexSignal.set(index);
  }

  previous(): void {
    const count = this.images().length;
    if (!count) return;
    this.activeIndexSignal.set((this.activeIndex() - 1 + count) % count);
  }

  next(): void {
    const count = this.images().length;
    if (!count) return;
    this.activeIndexSignal.set((this.activeIndex() + 1) % count);
  }

  openLightbox(): void {
    if (!this.images().length) return;
    this.lightboxOpen.set(true);
  }

  closeLightbox(): void {
    this.lightboxOpen.set(false);
  }
}
