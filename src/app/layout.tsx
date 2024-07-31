
import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "@/styles/globals.css";
import * as ToastPrimitive from "@radix-ui/react-toast";
import { StyledToastViewport } from "@/components/Layout/Toast/Toast";
import { ToastProvider } from "@/hooks/useToast";
import { ProductProvider } from '@/hooks/ProductContext';

const roboto = Roboto({
  weight: "400",
  subsets: ["latin"]
});

export const metadata: Metadata = {
  title: "Next Dashboard",
  description: "Simple Ecommerece Platform",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={roboto.className}>
        <ToastPrimitive.Provider swipeDirection="right" duration={2000}>
          <ToastProvider>
            <ProductProvider>
              {children}
            </ProductProvider>
          </ToastProvider>
          <StyledToastViewport />
        </ToastPrimitive.Provider>
      </body>
    </html>
  );
}
