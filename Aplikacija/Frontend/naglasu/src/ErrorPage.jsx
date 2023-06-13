import { useRouteError } from "react-router-dom";

export default function ErrorPage() {
  const error = useRouteError();
  console.error(error);

  return (
    <div id="error-page"
      className='w-100 d-flex flex-column justify-content-center align-items-center bg-white'
    style={{height:'100vh'}}>
      <h1>Oops!</h1>
      <p>Izvinite, došlo je do greške!</p>
      <p>
        <i>{error.statusText || error.message}</i>
      </p>
    </div>
  );
}