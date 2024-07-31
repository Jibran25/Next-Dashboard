"use client"
import products from "@/data/products";
import { Product } from "@/types/Product";
import { useRouter } from "next/router";
import {useEffect, useState } from "react";
import { useParams } from "next/navigation";

export default function ManageProducts({params: {productId}}:{params:{productId: number}}){

        const [product, setProduct] = useState<Product | undefined>(undefined);

        useEffect(() => {
            setProduct(products.find((product)=> {
                return product.id == productId;
            }));
          }, [productId]);

          if(!product){
            return <div>Loading...</div>
          }

          return(
            <>
                <div className="flex flex-col gap-8">
                    <div className="flex justify-between text-center">
                        <h1>View Products</h1>
                    </div>
                    <div>
                        <h1>{product?.name}</h1>
                        <label htmlFor="productName">Product Name</label>
                        <p>Name: {product?.name}</p>
                        <p>Price: {product?.price}</p>
                        <p>Quantity: {product?.quantity}</p>
                    </div>
                </div>
            </>
          );

}