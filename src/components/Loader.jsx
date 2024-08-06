import ReactLoading from "react-loading";

export default function Loader({ type }) {
  return (
    <div className="d-flex flex-column align-items-center">
      <ReactLoading
        type="spin"
        color="#3498db"
        height={"2rem"}
        width={"2rem"}
      />
      <span className="visually-hidden">{`Loading ${type}`}</span>
    </div>
  );
}
