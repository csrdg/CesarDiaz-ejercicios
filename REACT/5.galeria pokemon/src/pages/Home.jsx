import { Gallery } from "../components";
import "./Home.css";

/**En Home es donde se va a pintar la Galerry que será la que haga uso de customHook que traerá los datos API */

export const Home = () => {
  return (
    <div id="homeContainer">
      <Gallery />
    </div>
  );
};
