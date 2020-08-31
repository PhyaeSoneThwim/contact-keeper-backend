const router = require("express").Router();
const { uploadPhoto } = require("../middlewares/upload");
const { resizePhoto } = require("../middlewares/resize");
const protect = require("../middlewares/protect");
const contactController = require("../controllers/contactController");

router.use(protect);
router
  .route("/")
  .post(contactController.addContact)
  .get(contactController.getContacts);

router
  .route("/:id")
  .get(contactController.getContact)
  .patch(contactController.updateContact)
  .delete(contactController.deleteContact);
module.exports = router;
