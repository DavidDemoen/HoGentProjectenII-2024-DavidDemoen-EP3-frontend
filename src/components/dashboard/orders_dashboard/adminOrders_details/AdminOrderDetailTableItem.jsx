export function AdminOrderDetailTableItem({ item }) {
  return (
    <tr className="table-row">
      <td>{item.product.name}</td>
      <td>{item.quantity}</td>
      <td>€ {item.transactionUnitPrice}</td>
      <td>{item.transactionDiscount}</td>
    </tr>
  );
}
