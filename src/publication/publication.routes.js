import { Router } from "express";
import { addPublication, deletePublication, getPublication, updatePublication } from "./publication.controller.js";
import { addPublicationValidator, updatePublicationValidator, deletePublicationValidator } from "../middlewares/publication-validators.js";

const router = Router();

router.post("/addPublication", addPublicationValidator, addPublication);

router.get("/getPublication", getPublication);

router.put("/updatePublication/:pid", updatePublicationValidator, updatePublication);

router.delete("/deletePublication/:pid", deletePublicationValidator, deletePublication);

export default router;