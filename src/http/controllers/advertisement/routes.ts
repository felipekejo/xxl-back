import { verifyJWT } from "@/http/middlewares/verify-jwt";
import { verifyUserRole } from "@/http/middlewares/verify-user-role";
import { FastifyInstance } from "fastify";
import { uploadBanner } from "./uploadBanner";
import { uploadSecondAd } from "./uploadSecondAd";
import { deleteBanner } from "./deleteBanner";
import { deleteSecondAd } from "./deleteSecondAd";
import { getBanners } from "./getBanners";
import { getSecondAds } from "./getSecondAd";

export async function advertisementRoutes(app: FastifyInstance) {
  app.post(
    "/banners",
    { onRequest: [verifyJWT, verifyUserRole(["ADMIN", "OWNER"])] },
    uploadBanner
  );
  app.post(
    "/secondAds",
    { onRequest: [verifyJWT, verifyUserRole(["ADMIN", "OWNER"])] },
    uploadSecondAd
  );
  app.delete(
    "/banners/:bannerId",
    { onRequest: [verifyJWT, verifyUserRole(["ADMIN", "OWNER"])] },
    deleteBanner
  );
  app.delete(
    "/secondAds/:secondAdId",
    { onRequest: [verifyJWT, verifyUserRole(["ADMIN", "OWNER"])] },
    deleteSecondAd
  );
  app.get(
    "/banners",

    getBanners
  );
  app.get(
    "/secondAds",

    getSecondAds
  );
}
