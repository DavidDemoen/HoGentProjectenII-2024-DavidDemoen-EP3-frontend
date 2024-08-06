import "../../../../styles/ui_element/card_styles.css";
import AsyncData from "../../AsyncData";

export function CardGeneral({ title, body, loading, error, type }) {
  return (
    <>
      <div className="card">
        <div className="card-header">
          <div className="card-title">
            <p>{title}</p>
          </div>
        </div>
        <div className="card-content">
          <AsyncData loading={loading} error={error} type={type}>
            <div className="card-data">
              <p>{body.data}</p>
            </div>
            <div className="card-subdata">
              <p>{body.subdata}</p>
            </div>
          </AsyncData>
        </div>
      </div>
    </>
  );
}
