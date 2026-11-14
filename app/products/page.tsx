import { permanentRedirect } from 'next/navigation';
import { product } from '@/lib/content';

/** We have one product today, so /products goes straight to it */
export default function ProductsPage() {
  permanentRedirect(product.href);
}
