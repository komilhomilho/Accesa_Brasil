import { Router } from "express";
import { wrapController } from "./wrapper.js";
import checkUpdateController from "./chkUpdate.controller.js";
import syncServiceController from "./sync.controller.js";

const router = Router();

router.get('/check-update', wrapController(checkUpdateController));
router.get('/sync-service', wrapController(syncServiceController));

export default router;
