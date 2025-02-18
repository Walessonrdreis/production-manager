import React, { useState } from 'react';

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  stock: number;
  category: string;
  status: 'active' | 'inactive';
}

interface ProductListProps {
  products: Product[];
  onEdit: (product: Product) => void;
  onDelete: (id: number) => void;
  onUpdateStock: (id: number, quantity: number) => void;
}

export const ProductList: React.FC<ProductListProps> = ({
  products,
  onEdit,
  onDelete,
  onUpdateStock
}) => {
  const [stockUpdates, setStockUpdates] = useState<{ [key: number]: number }>({});

  const handleStockChange = (id: number, value: string) => {
    setStockUpdates({
      ...stockUpdates,
      [id]: Number(value)
    });
  };

  const handleStockUpdate = (id: number) => {
    const quantity = stockUpdates[id];
    if (quantity !== undefined) {
      onUpdateStock(id, quantity);
      setStockUpdates({
        ...stockUpdates,
        [id]: 0
      });
    }
  };

  const formatPrice = (price: number): string => {
    if (typeof price !== 'number') {
      return 'R$ 0,00';
    }
    return `R$ ${price.toFixed(2).replace('.', ',')}`;
  };

  if (products.length === 0) {
    return <div className="no-products">Nenhum produto cadastrado</div>;
  }

  return (
    <div className="product-list">
      <table>
        <thead>
          <tr>
            <th>Nome</th>
            <th>Categoria</th>
            <th>Preço</th>
            <th>Estoque</th>
            <th>Status</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {products.map(product => (
            <tr key={product.id}>
              <td>
                <div className="product-name">
                  <span>{product.name}</span>
                  {product.description && (
                    <p className="product-description">{product.description}</p>
                  )}
                </div>
              </td>
              <td>{product.category}</td>
              <td>{formatPrice(Number(product.price))}</td>
              <td>
                <div className="stock-control">
                  <span className={`stock-value ${product.stock <= 5 ? 'low-stock' : ''}`}>
                    {product.stock}
                  </span>
                  <div className="stock-update">
                    <input
                      type="number"
                      value={stockUpdates[product.id] || 0}
                      onChange={(e) => handleStockChange(product.id, e.target.value)}
                      placeholder="Qtd"
                    />
                    <button
                      onClick={() => handleStockUpdate(product.id)}
                      className="update-stock-button"
                      title="Atualizar estoque"
                    >
                      ↺
                    </button>
                  </div>
                </div>
              </td>
              <td>
                <span className={`status-badge ${product.status}`}>
                  {product.status === 'active' ? 'Ativo' : 'Inativo'}
                </span>
              </td>
              <td>
                <div className="action-buttons">
                  <button
                    onClick={() => onEdit(product)}
                    className="edit-button"
                    title="Editar produto"
                  >
                    ✎
                  </button>
                  <button
                    onClick={() => onDelete(product.id)}
                    className="delete-button"
                    title="Excluir produto"
                  >
                    ×
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}; 