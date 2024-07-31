"use client";

import { useRouter } from "next/navigation";
import Button from "@/components/Shared/Button/Button";
import Table from "@/components/Shared/Table/Table";
import { useProductContext } from "@/hooks/ProductContext";
import { Product } from "@/types/Product";
import Link from "next/link";

export default function ManageProducts() {
  const { products } = useProductContext();
  const router = useRouter();

  const handleEdit = (product: Product) => {
    const productString = encodeURIComponent(JSON.stringify(product));
    router.push(`/addproduct?edit=${productString}`);
  };

  const handleDelete = (product: Product) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      // setProducts(products.filter(p => p !== product));
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-between items-center">
        <h2>Manage Products</h2>
        <Button variant="dark" onClick={() => router.push('/manage-products/addproduct/')}>
          Add Product
        </Button>
      </div>

      <Table>
        <Table.Head>
          <Table.Row>
            <Table.Cell>#</Table.Cell>
            <Table.Cell>Product Name</Table.Cell>
            <Table.Cell>Price</Table.Cell>
            <Table.Cell>Quantity</Table.Cell>
            <Table.Cell>Action</Table.Cell>
          </Table.Row>
        </Table.Head>
        <Table.Body>
          {products.map((product, index) => (
            <Table.Row key={index}>
              <Table.Cell>{index + 1}</Table.Cell>
              <Table.Cell>{product.name}</Table.Cell>
              <Table.Cell>$ {product.price}</Table.Cell>
              <Table.Cell>{product.quantity}</Table.Cell>
              <Table.Cell>
                <div>
                  <Link href= {`manage-products/viewproduct/${product.id}`} ><Button size="small" variant="outline">View</Button></Link>
                  <Button size="small" variant="outline" onClick={() => handleEdit(product)}>Edit</Button>
                  <Button size="small" variant="outline" onClick={() => handleDelete(product)}>Delete</Button>
                </div>
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    </div>
  );
}
