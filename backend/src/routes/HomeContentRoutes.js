const express = require("express");
const router = express.Router();

const HomeContentController = require("../controllers/HomeContentController");
const { authenticate, authorize } = require("../middlewares");

// Routes publiques pour afficher le contenu
router.get("/", HomeContentController.getAllContent);
router.get("/:section", HomeContentController.getContentBySection);

// Routes protégées pour modifier le contenu (admin seulement)
// IMPORTANT: Route générale AVANT route avec paramètre
router.put(
  "/bulk-update",
  // authenticate,
  // authorize("super_admin", "admin"),
  HomeContentController.updateAllContent
);

router.put(
  "/:section",
  // authenticate,
  // authorize("super_admin", "admin"),
  HomeContentController.updateContent
);

module.exports = router;
