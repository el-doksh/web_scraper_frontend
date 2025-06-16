'use client';
import { useEffect, useState } from "react";
import axios from "axios";
import { ProductCard } from "./components/ProductCard";
import { LoadingSpinner } from "./components/LoadingSpinner";

type Product = {
    id: number;
    title: string;
    price: number;
    image_url: string;
};

export default function Home() {
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
      const fetchProducts = async () => {
          try {
              setLoading(true);
              const productsUrl = `${process.env.NEXT_PUBLIC_API_URL}/products`;
              const response = await axios.get(productsUrl);
              setProducts(response.data.data);
          } catch (error) {
              setError('Something went wrong!');
          } finally {
              setLoading(false);
          }
      }
      fetchProducts();

      const interval =  setInterval(fetchProducts, 30000);
      return () => clearInterval(interval);
  }, []);

  return (
    <div className="grid items-center justify-items-center p-12 gap-12 ">
      <h2 className="text-2xl font-bold mb-4">Products List</h2>
      {loading && <LoadingSpinner />}
      {!loading && error && (
        <div className="font-bold text-red-600">
          {error}
        </div>
      )}
      {!loading && !error && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {products.map(product => (
              <ProductCard 
                key={product.id}
                title={product.title}
                price={product.price}
                image={product.image_url} 
              />
            ))}
        </div>
      )}
    </div>
  );
}
