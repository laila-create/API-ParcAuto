import express from "express";

const router = express.Router();

let vehicules = [
  { id: 1, marque: "Dacia", modele: "Logan", immatriculation: "12345-A-6", disponible: true },
  { id: 2, marque: "Renault", modele: "Clio", immatriculation: "67890-B-6", disponible: false },
  { id: 3, marque: "Peugeot", modele: "208", immatriculation: "24680-D-1", disponible: true }
];

let nextId = 4;
// GET /vehicules
router.get("/", (req, res) => {
    if (req.query.disponible === "true") {
        res.json(vehicules.filter(v => v.disponible === true));
    } else {
        res.status(200).json(vehicules);
    }
});

// GET /vehicules/:id
router.get("/:id", (req,res) => {
        const vehicule = vehicules.find(v => v.id == req.params.id);
    if (!vehicule) {
        res.status(404).json({ erreur: "Vehicule introuvable" });
    } else {
        res.status(200).json(vehicule);
    }
});

// POST /vehicules
router.post("/", (req, res) => {
    const { marque, modele, immatriculation} = req.body;

    if (marque && modele && immatriculation) {
        const nouveau = {
            id: nextId,
            marque: marque,
            modele: modele,
            immatriculation: immatriculation,
            disponible: true
        };
        nextId++;
        vehicules.push(nouveau);
        res.status(201).json(nouveau);
    }else {
        res.status(400).json({ erreur: "Champs obligatoires manquants"})
    }
});

// PATCH /vehicles/:id
router.patch("/:id", (req, res) => {
  const vehicule = vehicules.find((v) => v.id == req.params.id);

  if (vehicule) {
    if (req.body.marque !== undefined) vehicule.marque = req.body.marque;
    if (req.body.modele !== undefined) vehicule.modele = req.body.modele;
    if (req.body.immatriculation !== undefined) vehicule.immatriculation = req.body.immatriculation;
    if (req.body.disponible !== undefined) vehicule.disponible = req.body.disponible;
    res.status(200).json(vehicule);
  } else {
    res.status(404).json({ erreur: "Vehicule introuvable" });
  }
});

// DELETE
router.delete("/:id", (req, res) => {
  const vehicule = vehicules.find((v) => v.id == req.params.id);

  if (vehicule) {
    vehicules = vehicules.filter((v) => v.id != req.params.id);
    res.status(204).send();
  } else {
    res.status(404).json({ erreur: "Véhicule introuvable" });
  }
});

export default router;