'use client';
import { use, useEffect, useState } from 'react';
import { Button } from './ui/button';
import { useCart } from '@/hooks/use-cart';
import { Product } from '@/payload-types';

const AddToCartButton = ({ product }: { product: Product }) => {
  const { addToCart } = useCart();
  const [isSuccess, setIsSuccess] = useState<boolean>(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsSuccess(false);
    }, 2000);
    return () => clearTimeout(timeout);
  }, [isSuccess]);
  return (
    <Button
      size={'lg'}
      className='w-full'
      onClick={() => {
        addToCart(product);
        setIsSuccess(true);
      }}
    >
      {isSuccess ? 'Added!' : 'Add to cart'}
    </Button>
  );
};

export default AddToCartButton;
