const { PrismaClient } = require("@prisma/client");
const express = require("express");
const router = express.Router();
const prisma = new PrismaClient();

router.get("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const user = await prisma.user.findUnique({
      where: {
        id: parseInt(id),
      },
    });

    if (!user) {
      return res.status(404).json({ message: "utilisateur introuvable" });
    }

    res.status(201).json(user);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Erreur lors de la récupération utilisateur" }, error);
  }
});

router.get("/", async (req, res) => {
  try {
    const users = await prisma.user.findMany();

    if (!users) {
      return res.status(404).json({ message: "Utilisatreurs introuvables" });
    }

    res.status(201).json(users);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Erreur de la récupération des utilisateurs" });
  }
});

router.post("/", async (req, res) => {
  const { name, age } = await req.body;

  if (!name || !age) {
    return res
      .status(401)
      .json({ message: "Tout les champs doivent être remplis" });
  }

  try {
    const user = await prisma.user.create({
      data: {
        name,
        age,
      },
    });
    res.status(201).json(user);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Erreur lors de la création de l'utilisateur" }, error);
  }
});

router.put("/:id", async (req, res) => {
  const { name, age } = await req.body;
  const { id } = req.params;

  try {
    if (!name || !age) {
      return res
        .status(401)
        .json({ message: "Il faut remplir tout les champs" });
    }

    const updatedUser = await prisma.user.update({
      where: {
        id: parseInt(id),
      },

      data: {
        name,
        age,
      },
    });

    res
      .status(201)
      .json({ message: "Utilisateur mis à jour", user: updatedUser });
  } catch (error) {
    res.status(500).json({ error: "Erreur lors de la mise à jour" }, error);
  }
});

router.delete("/:id", async (req, res) => {
  const { id } = await req.params;

  try {
    await prisma.user.delete({
      where: {
        id: parseInt(id),
      },
    });

    res.status(201).json({ message: "utilisateur supprimé avec succès" });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Erreur lors de la suppression utilisateur" }, error);
  }
});

module.exports = router;
