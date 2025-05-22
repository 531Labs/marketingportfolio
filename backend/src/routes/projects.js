const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const { body, validationResult } = require('express-validator');
const Project = require('../models/Project');
const { auth, adminAuth } = require('../middleware/auth');

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, '../../public/uploads'));
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
  fileFilter: (req, file, cb) => {
    const allowedTypes = /jpeg|jpg|png|gif/;
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = allowedTypes.test(file.mimetype);
    if (extname && mimetype) {
      return cb(null, true);
    }
    cb(new Error('Only image files are allowed!'));
  }
});

// Get all projects
router.get('/', async (req, res) => {
  try {
    const projects = await Project.find({ isPublished: true })
      .sort({ order: 1, createdAt: -1 });
    res.json(projects);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Get single project
router.get('/:slug', async (req, res) => {
  try {
    const project = await Project.findOne({ slug: req.params.slug, isPublished: true });
    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }
    res.json(project);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Create project (admin only)
router.post('/',
  auth,
  adminAuth,
  upload.fields([
    { name: 'featuredImage', maxCount: 1 },
    { name: 'images', maxCount: 10 }
  ]),
  [
    body('title').trim().notEmpty(),
    body('slug').trim().notEmpty(),
    body('description').trim().notEmpty(),
    body('content').trim().notEmpty(),
    body('year').isInt({ min: 2000, max: new Date().getFullYear() })
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const { title, slug, description, content, tags, year, order } = req.body;
      
      // Check if project with slug already exists
      const existingProject = await Project.findOne({ slug });
      if (existingProject) {
        return res.status(400).json({ message: 'Project with this slug already exists' });
      }

      const project = new Project({
        title,
        slug,
        description,
        content,
        tags: tags ? JSON.parse(tags) : [],
        year,
        order: order || 0,
        featuredImage: req.files.featuredImage ? `/uploads/${req.files.featuredImage[0].filename}` : '',
        images: req.files.images ? req.files.images.map(file => `/uploads/${file.filename}`) : []
      });

      await project.save();
      res.status(201).json(project);
    } catch (error) {
      res.status(500).json({ message: 'Server error' });
    }
  }
);

// Update project (admin only)
router.put('/:id',
  auth,
  adminAuth,
  upload.fields([
    { name: 'featuredImage', maxCount: 1 },
    { name: 'images', maxCount: 10 }
  ]),
  async (req, res) => {
    try {
      const project = await Project.findById(req.params.id);
      if (!project) {
        return res.status(404).json({ message: 'Project not found' });
      }

      const updates = req.body;
      if (req.files.featuredImage) {
        updates.featuredImage = `/uploads/${req.files.featuredImage[0].filename}`;
      }
      if (req.files.images) {
        updates.images = req.files.images.map(file => `/uploads/${file.filename}`);
      }
      if (updates.tags) {
        updates.tags = JSON.parse(updates.tags);
      }

      Object.assign(project, updates);
      await project.save();
      res.json(project);
    } catch (error) {
      res.status(500).json({ message: 'Server error' });
    }
  }
);

// Delete project (admin only)
router.delete('/:id',
  auth,
  adminAuth,
  async (req, res) => {
    try {
      const project = await Project.findById(req.params.id);
      if (!project) {
        return res.status(404).json({ message: 'Project not found' });
      }

      await project.remove();
      res.json({ message: 'Project deleted' });
    } catch (error) {
      res.status(500).json({ message: 'Server error' });
    }
  }
);

module.exports = router; 