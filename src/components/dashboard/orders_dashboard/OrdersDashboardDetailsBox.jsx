import { useOrdersAPIContext } from "../../../context/Orders.API.context";

export function OrdersDashboardDetailsBox() {
  const { selectedOrderId } = useOrdersAPIContext();
  return (
    <>
      <p>{selectedOrderId} Orders Details</p>
    </>
  );
}
