import { firstCharToUpperCase } from "../../utils/Formatter";

export function DashboardHeader({ type }) {
  const imageName = firstCharToUpperCase(type);
  const image = `/assets/imgs/accounts/${imageName}AccountImg.png`;

  console.log(image);

  return (
    <>
      <div className="dashboard-header-container">
        <img src={image} alt="" className="dashboard-header-img" />
      </div>
    </>
  );
}
