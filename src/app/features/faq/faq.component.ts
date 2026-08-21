import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SeoService } from '../../core/seo/seo.service';

interface FaqItem {
  question: string;
  answer: string;
  isPlaceholder?: boolean;
}

@Component({
  selector: 'app-faq',
  standalone: true,
  imports: [RouterLink],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="container section prose-page">
      <span class="eyebrow prose-page__eyebrow">Support</span>
      <h1>FAQ</h1>

      @for (item of items; track item.question) {
        <h2>{{ item.question }}</h2>
        <p class="text-muted">{{ item.answer }}</p>
        @if (item.isPlaceholder) {
          <span class="prose-page__todo">TODO — confirm with client</span>
        }
      }

      <h2>Still have a question?</h2>
      <p class="text-muted">
        Reach out on the <a routerLink="/contact">contact page</a> and we'll get back to you.
      </p>
    </div>
  `
})
export class FaqComponent {
  protected readonly items: FaqItem[] = [
    {
      question: 'How do I place an order?',
      answer: 'Add items to your cart and check out securely through Shopify.'
    },
    {
      question: 'What payment methods do you accept?',
      answer: 'All major payment methods supported through Shopify checkout.'
    },
    {
      question: 'Where do you ship?',
      answer: 'Shipping regions and any restrictions have not been finalized yet.',
      isPlaceholder: true
    },
    {
      question: 'Is there an age requirement to purchase?',
      answer: 'Any age verification requirements depend on local regulations and have not been finalized yet.',
      isPlaceholder: true
    },
    {
      question: "What's your return policy?",
      answer: 'See the Shipping & Returns page for details.'
    }
  ];

  constructor() {
    inject(SeoService).update({ title: 'FAQ', path: '/faq' });
  }
}
