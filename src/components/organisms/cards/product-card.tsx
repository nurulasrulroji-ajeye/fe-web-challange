import { CardWrapper } from '@/components/atoms';
import { TProducts } from '@/domain/entities';
import Image from 'next/image';
import React from 'react';

type ProductCardProps = {
  data: TProducts;
};

export const ProductCard = ({ data }: ProductCardProps) => {
  return (
    <CardWrapper>
      <div onClick={() => console.log(data.id)} className="w-full flex flex-col gap-1">
        <div className="w-full relative h-48 overflow-hidden rounded-md">
          <Image
            alt={data.title}
            src={data.thumbnail}
            fill
            sizes="100vh"
            priority
            className="object-cover transition-opacity opacity-0 duration-[2s]"
            onLoad={(e) => e.currentTarget.classList.remove('opacity-0')}
          />
          <div className="absolute right-1 top-1 rounded bg-yellow-200 shadow text-primary leading-none p-1 text-xs font-bold">
            {data.discountPercentage}%
          </div>
        </div>
        <div className="w-full flex flex-col h-24 justify-between px-2 pb-2">
          <h5 className="text-sm font-medium line-clamp-2 leading-none">{data.title}</h5>
          <div className="w-full flex flex-col gap-[2px]">
            <div className="w-full flex">
              <div className="shadow py-[0.15rem] px-2 leading-none rounded-full bg-secondary text-xs font-medium text-white">
                {data.rating}
              </div>
            </div>
            <div className="w-full flex justify-between items-end">
              <p className="text-lg font-semibold text-primary leading-none">${data.price}</p>
              <p className="text-sm font-semibold text-primary leading-none">Stock: {data.stock}</p>
            </div>
          </div>
        </div>
      </div>
    </CardWrapper>
  );
};
