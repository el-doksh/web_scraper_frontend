'use client';

type ProductCardProps = {
  title: string;
  price: number;
  image: string;
};

export const ProductCard = ({ title, price, image }: ProductCardProps) => {
    return (
        <div className="max-w-sm p-2 gap-4 rounded overflow-hidden shadow-lg items-center">            
            <img
                className="w-full"
                src={image}
                alt={title}
                width={100}
                height={100}
            />
            <div className="text-sm mb-2">{title}</div>
            <p className="font-bold text-gray-700 text-base">{price} EGP</p>
        </div>
    );
}