import React from 'react';
import './App.css';

const useSortableData = (items, config = null) => {
  const [sortConfig, setSortConfig] = React.useState(config);

  const sortedItems = React.useMemo(() => {
    let sortableItems = [...items];
    if (sortConfig !== null) {
      sortableItems.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? 1 : -1;
        }
        return 0;
      });
    }
    return sortableItems;
  }, [items, sortConfig]);

  const requestSort = (key) => {
    let direction = 'ascending';
    if (
      sortConfig &&
      sortConfig.key === key &&
      sortConfig.direction === 'ascending'
    ) {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };

  return { items: sortedItems, requestSort, sortConfig };
};

const ProductTable = (props) => {
  const { items, requestSort, sortConfig } = useSortableData(props.products);
  const getClassNamesFor = (name) => { //สัญลักษณ์
    if (!sortConfig) {
      return;
    }
    return sortConfig.key === name ? sortConfig.direction : undefined;
  };
  return (
    <table>
      <caption>Products</caption>
      <thead>
        <tr>
          <th>
            <button
              type="button"
              onClick={() => requestSort('name')}
              className={getClassNamesFor('name')}
            >
              Name
            </button>
          </th>
          <th>
            <button
              type="button"
              onClick={() => requestSort('price')}
              className={getClassNamesFor('price')}
            >
              Price
            </button>
          </th>
          <th>
            <button
              type="button"
              onClick={() => requestSort('stock')}
              className={getClassNamesFor('stock')}
            >
              In Stock
            </button>
          </th>
        </tr>
      </thead>
      <tbody>
        {items.map((item) => (
          <tr key={item.id}>
            <td>{item.name}</td>
            <td>{item.price} บาท</td>
            <td>{item.stock}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default function App() {
  return (
    <div className="App">
      <ProductTable
        products={[
          { id: 1, name: 'Cheese', price: 49, stock: 20 },
          { id: 2, name: 'Milk', price: 19, stock: 32 },
          { id: 3, name: 'Yoghurt', price: 24, stock: 12 },
          { id: 4, name: 'Heavy Cream', price: 39, stock: 9 },
          { id: 5, name: 'Butter', price: 9, stock: 99 },
          { id: 6, name: 'Sour Cream ', price: 29, stock: 86 },
          { id: 7, name: 'Fancy French Cheese 🇫🇷', price: 99, stock: 12 },
        ]}
      />
    </div>
  );
}
