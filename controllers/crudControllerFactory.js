const factory = {
  getAll: (Model) => async (req, res) => {
    try {
      const docs = await Model.find({}).sort({ createdAt: -1 });
      res.json(docs);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  getOne: (Model) => async (req, res) => {
    try {
      const doc = await Model.findById(req.params.id);
      if (doc) res.json(doc);
      else res.status(404).json({ message: 'Document not found' });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  create: (Model) => async (req, res) => {
    try {
      const doc = new Model(req.body);
      const createdDoc = await doc.save();
      res.status(201).json(createdDoc);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  update: (Model) => async (req, res) => {
    try {
      const doc = await Model.findById(req.params.id);
      if (doc) {
        Object.assign(doc, req.body);
        const updatedDoc = await doc.save();
        res.json(updatedDoc);
      } else {
        res.status(404).json({ message: 'Document not found' });
      }
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  deleteOne: (Model) => async (req, res) => {
    try {
      const doc = await Model.findById(req.params.id);
      if (doc) {
        await doc.deleteOne();
        res.json({ message: 'Document removed' });
      } else {
        res.status(404).json({ message: 'Document not found' });
      }
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
};

export default factory;
