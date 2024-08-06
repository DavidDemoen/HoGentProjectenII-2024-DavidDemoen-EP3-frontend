import Loader from "./Loader";
import Error from "./Error";

export default function AsyncData({ loading, error, type, children }) {
  if (loading) {
    //console.log("loading in asyncdata");
    return <Loader type={type} />;
  }
  return (
    <>
      <Error error={error} />
      {children}
    </>
  );
}
