import { Router } from "express";
import db from "../models/index.js";
const { Creator } = db;

const router = Router();

// This is a simple example for providing basic CRUD routes for
// a resource/model. It provides the following:
//    GET    /api/creators
//    POST   /api/creators
//    GET    /api/creators/:id
//    PUT    /api/creators/:id
//    DELETE /api/creators/:id
//
// The full URL's for these routes are composed by combining the
// prefixes used to load the controller files.
//    /api comes from the file /app.js
//    /creators comes from the file /controllers/index.js

router.get("/", (req, res) => {
  Creator.findAll({}).then((allCreators) => res.json(allCreators));
});

router.post("/", (req, res) => {
  let { content } = req.body;

  Creator.create({ content })
    .then((newCreator) => {
      res.status(201).json(newCreator);
    })
    .catch((err) => {
      res.status(400).json(err);
    });
});

router.get("/:id", (req, res) => {
  const { id } = req.params;
  Creator.findByPk(id).then((creator) => {
    if (!creator) {
      return res.sendStatus(404);
    }

    res.json(creator);
  });
});

router.put("/:id", (req, res) => {
  const { id } = req.params;
  Creator.findByPk(id).then((creator) => {
    if (!creator) {
      return res.sendStatus(404);
    }

    creator.content = req.body.content;
    creator
      .save()
      .then((updatedCreator) => {
        res.json(updatedCreator);
      })
      .catch((err) => {
        res.status(400).json(err);
      });
  });
});

router.delete("/:id", (req, res) => {
  const { id } = req.params;
  Creator.findByPk(id).then((creator) => {
    if (!creator) {
      return res.sendStatus(404);
    }

    creator.destroy();
    res.sendStatus(204);
  });
});

export default router;
