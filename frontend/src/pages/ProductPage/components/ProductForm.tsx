import React, { useState, useEffect } from 'react';

interface Product {
  id?: number;
  name: string;
  description: string;
  price: number;
  stock: number;
  category: string;
  status: 'active' | 'inactive';
}

interface ProductFormProps {
  product?: Product | null;
  onSubmit: (data: Omit<Product, 'id'>) => Promise<void>;
  onCancel: () => void;
}

export const ProductForm: React.FC<ProductFormProps> = ({
  product,
  onSubmit,
  onCancel
}) => {
  const [formData, setFormData] = useState<Omit<Product, 'id'>>({
    name: '',
    description: '',
    price: 0,
    stock: 0,
    category: '',
    status: 'active'
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (product) {
      setFormData({
        name: product.name,
        description: product.description || '',
        price: product.price,
        stock: product.stock,
        category: product.category,
        status: product.status || 'active'
      });
    }
  }, [product]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    
    // Tratamento especial para campos numéricos e status
    if (name === 'price' || name === 'stock') {
      const numValue = parseFloat(value);
      if (!isNaN(numValue)) {
        setFormData(prev => ({
          ...prev,
          [name]: numValue
        }));
      }
    } else if (name === 'status') {
      setFormData(prev => ({
        ...prev,
        status: value as 'active' | 'inactive'
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      // Validações antes de enviar
      if (formData.price < 0) {
        throw new Error('O preço não pode ser negativo');
      }
      if (formData.stock < 0) {
        throw new Error('O estoque não pode ser negativo');
      }
      if (!formData.name.trim()) {
        throw new Error('O nome do produto é obrigatório');
      }
      if (!formData.category.trim()) {
        throw new Error('A categoria é obrigatória');
      }

      await onSubmit(formData);
      setFormData({
        name: '',
        description: '',
        price: 0,
        stock: 0,
        category: '',
        status: 'active'
      });
    } catch (err: any) {
      setError(err.message || 'Erro ao salvar produto');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="product-form">
      <h2>{product ? 'Editar Produto' : 'Novo Produto'}</h2>

      {error && <div className="error-message">{error}</div>}

      <div className="form-group">
        <label htmlFor="name">Nome</label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
          placeholder="Nome do produto"
          maxLength={255}
        />
      </div>

      <div className="form-group">
        <label htmlFor="description">Descrição</label>
        <textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Descrição do produto"
          rows={3}
          maxLength={1000}
        />
      </div>

      <div className="form-row">
        <div className="form-group">
          <label htmlFor="price">Preço (R$)</label>
          <input
            type="number"
            id="price"
            name="price"
            value={formData.price}
            onChange={handleChange}
            required
            min="0"
            step="0.01"
          />
        </div>

        <div className="form-group">
          <label htmlFor="stock">Estoque</label>
          <input
            type="number"
            id="stock"
            name="stock"
            value={formData.stock}
            onChange={handleChange}
            required
            min="0"
            step="1"
          />
        </div>
      </div>

      <div className="form-row">
        <div className="form-group">
          <label htmlFor="category">Categoria</label>
          <input
            type="text"
            id="category"
            name="category"
            value={formData.category}
            onChange={handleChange}
            required
            placeholder="Categoria do produto"
            maxLength={100}
          />
        </div>

        <div className="form-group">
          <label htmlFor="status">Status</label>
          <select
            id="status"
            name="status"
            value={formData.status}
            onChange={handleChange}
          >
            <option value="active">Ativo</option>
            <option value="inactive">Inativo</option>
          </select>
        </div>
      </div>

      <div className="form-actions">
        <button 
          type="button" 
          onClick={onCancel}
          className="cancel-button"
        >
          Cancelar
        </button>
        <button 
          type="submit" 
          disabled={loading}
          className="submit-button"
        >
          {loading ? 'Salvando...' : product ? 'Atualizar' : 'Criar'}
        </button>
      </div>
    </form>
  );
}; 