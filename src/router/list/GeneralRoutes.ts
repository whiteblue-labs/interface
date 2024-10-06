
import { RouteProps } from "../../types/route";
import Marketplace from "../../pages/marketplace";

const GeneralRoutes: Array<RouteProps> = [
  {
    path: "/",
    element: Marketplace,
    title: "App",
  },
];

export default GeneralRoutes;
