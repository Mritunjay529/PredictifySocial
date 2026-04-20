import { createStartHandler } from "@tanstack/react-start/server";
import { getRouterManifest } from "@tanstack/react-start/router-manifest";

export default createStartHandler({
  createRouter: () => ({
    routeTree: getRouterManifest(),
    defaultPreload: "intent",
  }),
});