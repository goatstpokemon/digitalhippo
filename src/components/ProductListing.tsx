'use client';

import { Product } from '../payload-types';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { Skeleton } from './ui/skeleton';
import { cn, formatPrice } from '@/lib/utils';
import { PRODUCTS_CATEGORIES } from '@/config';
import ImageSlider from './ImageSlider';
interface ProductListingProps {
  product: Product | null;
  index: number;
}
const ProductListing = ({ product, index }: ProductListingProps) => {
  const [isVisable, setIsVisable] = useState<boolean>(false);
  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsVisable(true);
    }, 75 * index);
    return () => clearTimeout(timeout);
  }, [index]);

  if (!product || !isVisable) return <ProductPlaceholder />;
  const label = PRODUCTS_CATEGORIES.find(
    ({ value }) => value === product.category
  )?.label;

  const validUrls = product.images
    .map(({ image }) => (typeof image === 'string' ? image : image.url))
    .filter(Boolean) as string[];
  if (isVisable && product) {
    return (
      <Link
        href={`/product/${product.id}`}
        className={cn('invisible h-full w-full cursor-pointer  group/main', {
          'visible animate-in fade-in-5': isVisable,
        })}
      >
        <div className='flex flex-col w-full'>
          <ImageSlider urls={validUrls} />
          <h3 className='mt-4 font-medium text-gray-700 text-sm'>
            {product.name}
          </h3>
          <p className='mt-1 text-sm text-gray-500'>{label}</p>
          <p className='mt-1 font-medium text-sm text-gray-900'>
            {formatPrice(product.price)}
          </p>
        </div>
      </Link>
    );
  }
};

const ProductPlaceholder = () => {
  return (
    <div className='flex flex-col w-full'>
      <div className='relative bg-zinc-100 aspect-square w-full overflow-hidden rounded-xl'>
        <Skeleton className='h-full w-full' />
      </div>
      <Skeleton className='mt-4 w-2/3 h-4 rounded-lg' />
      <Skeleton className='mt-2 w-16 h-4 rounded-lg' />
      <Skeleton className='mt-2 w-12 h-4 rounded-lg' />
    </div>
  );
};
export default ProductListing;
