import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Product } from '../../../../core/models/product.model';
import { HOME_CONTENT } from '../../../../config/content.config';
import { ProductGridComponent } from '../../../../shared/components/product-grid/product-grid.component';
import { ProductGridSkeletonComponent } from '../../../../shared/components/product-grid-skeleton/product-grid-skeleton.component';
import { EmptyStateComponent } from '../../../../shared/components/empty-state/empty-state.component';
import { ButtonComponent } from '../../../../shared/components/button/button.component';

@Component({
  selector: 'app-featured-products',
  standalone: true,
  imports: [RouterLink, ProductGridComponent, ProductGridSkeletonComponent, EmptyStateComponent, ButtonComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './featured-products.component.html',
  styleUrl: './featured-products.component.scss'
})
export class FeaturedProductsComponent {
  readonly products = input<Product[]>([]);
  readonly loading = input(false);

  protected readonly content = HOME_CONTENT.shopLatest;
}
