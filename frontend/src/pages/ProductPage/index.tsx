import React, { useState, useEffect } from 'react';
import api from '../../services/api';
import { ProductForm } from './components/ProductForm';
import { ProductList } from './components/ProductList';
import './styles.css';

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  stock: number;
  category: string;
  status: 'active' | 'inactive';
}

export const ProductPage: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await api.get('/products');
      setProducts(response.data);
      setError(null);
    } catch (err: any) {
      setError(err.response?.data?.error || 'Erro ao carregar produtos');
      console.error('Erro ao buscar produtos:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleCreateProduct = async (productData: Omit<Product, 'id'>) => {
    try {
      const response = await api.post('/products', productData);
      setProducts([...products, response.data]);
      setIsFormOpen(false);
      setError(null);
    } catch (err: any) {
      setError(err.response?.data?.error || 'Erro ao criar produto');
    }
  };

  const handleUpdateProduct = async (id: number, productData: Partial<Product>) => {
    try {
      const response = await api.put(`/products/${id}`, productData);
      setProducts(products.map(product => 
        product.id === id ? response.data : product
      ));
      setSelectedProduct(null);
      setIsFormOpen(false);
      setError(null);
    } catch (err: any) {
      setError(err.response?.data?.error || 'Erro ao atualizar produto');
    }
  };

  const handleDeleteProduct = async (id: number) => {
    if (!window.confirm('Tem certeza que deseja excluir este produto?')) return;
    
    try {
      await api.delete(`/products/${id}`);
      setProducts(products.filter(product => product.id !== id));
      setError(null);
    } catch (err: any) {
      setError(err.response?.data?.error || 'Erro ao deletar produto');
    }
  };

  const handleEditProduct = (product: Product) => {
    setSelectedProduct(product);
    setIsFormOpen(true);
  };

  const handleUpdateStock = async (id: number, quantity: number) => {
    try {
      const response = await api.patch(`/products/${id}/stock`, { quantity });
      setProducts(products.map(product => 
        product.id === id ? response.data : product
      ));
      setError(null);
    } catch (err: any) {
      setError(err.response?.data?.error || 'Erro ao atualizar estoque');
    }
  };

  return (
    <div className="product-page">
      <div className="product-header">
        <h1>Gerenciamento de Produtos</h1>
        <button 
          className="add-product-button"
          onClick={() => {
            setSelectedProduct(null);
            setIsFormOpen(true);
          }}
        >
          Adicionar Produto
        </button>
      </div>

      {error && <div className="error-message">{error}</div>}

      {isFormOpen && (
        <div className="form-container">
          <ProductForm
            product={selectedProduct}
            onSubmit={selectedProduct ? 
              (data) => handleUpdateProduct(selectedProduct.id, data) : 
              handleCreateProduct}
            onCancel={() => {
              setIsFormOpen(false);
              setSelectedProduct(null);
            }}
          />
        </div>
      )}

      {loading ? (
        <div className="loading-message">Carregando produtos...</div>
      ) : (
        <ProductList
          products={products}
          onEdit={handleEditProduct}
          onDelete={handleDeleteProduct}
          onUpdateStock={handleUpdateStock}
        />
      )}
    </div>
  );
}; 