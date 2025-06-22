import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { Product } from "../types/Product";
import { supabase } from "../utils/supabaseClient";

interface ProductContextType {
  products: Product[];
  loading: boolean;
  addProduct: (
    product: Omit<Product, "id" | "createdAt" | "viewCount">
  ) => Promise<Product>;
  updateProduct: (id: string, updates: Partial<Product>) => Promise<void>;
  deleteProduct: (id: string) => Promise<void>;
  getProductById: (id: string) => Product | undefined;
  incrementViewCount: (id: string) => void;
}

const ProductContext = createContext<ProductContextType | undefined>(undefined);

export const useProductContext = () => {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error("useProductContext must be used within a ProductProvider");
  }
  return context;
};

interface ProductProviderProps {
  children: ReactNode;
}

export const ProductProvider: React.FC<ProductProviderProps> = ({
  children,
}) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch products from Supabase
  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from("products")
        .select("*")
        .order("createdAt", { ascending: false });
      if (!error && data) {
        setProducts(data as Product[]);
      }
      setLoading(false);
    };
    fetchProducts();
  }, []);

  // Add product to Supabase
  const addProduct = async (
    product: Omit<Product, "id" | "createdAt" | "viewCount">
  ) => {
    const { data, error } = await supabase
      .from("products")
      .insert([{ ...product }])
      .select()
      .single();
    if (!error && data) {
      setProducts((prev) => [data as Product, ...prev]);
      return data as Product;
    }
    // Lempar error dengan detail Supabase jika ada
    if (error) {
      throw new Error(
        error.message + (error.details ? `: ${error.details}` : "")
      );
    }
    throw new Error("Unknown error saat insert produk");
  };

  // Update product in Supabase
  const updateProduct = async (id: string, updates: Partial<Product>) => {
    const { data, error } = await supabase
      .from("products")
      .update(updates)
      .eq("id", id)
      .select()
      .single();
    if (!error && data) {
      setProducts((prev) =>
        prev.map((product) =>
          product.id === id ? { ...product, ...updates } : product
        )
      );
    }
  };

  // Delete product from Supabase
  const deleteProduct = async (id: string) => {
    const { error } = await supabase.from("products").delete().eq("id", id);
    if (!error) {
      setProducts((prev) => prev.filter((product) => product.id !== id));
    }
  };

  const getProductById = (id: string) => {
    return products.find((product) => product.id === id);
  };

  const incrementViewCount = (id: string) => {
    setProducts((prev) =>
      prev.map((product) =>
        product.id === id
          ? { ...product, viewCount: product.viewCount + 1 }
          : product
      )
    );
  };

  const value = {
    products,
    loading,
    addProduct,
    updateProduct,
    deleteProduct,
    getProductById,
    incrementViewCount,
  };

  return (
    <ProductContext.Provider value={value}>{children}</ProductContext.Provider>
  );
};
