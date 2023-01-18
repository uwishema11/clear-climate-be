const express = require('express');
const isAuth = require('./../middleware/authMiddleware');
const router = express.Router();
const projectsController = require('./../controllers/projectController');

router.route('/')
.get(isAuth.Protected, projectsController.getAllProjects)
.post(isAuth.Protected, isAuth.Restrict('admin', 'vc-admin'),projectsController.createProject);

router
  .route('/:id')
  .delete(isAuth.Protected, isAuth.Restrict('admin', 'vc-admin'), projectsController.deleteProject)
  .patch(isAuth.Protected, isAuth.Restrict('admin', 'vc-admin'),projectsController.updateProjectes)
  .get(projectsController.getProject);

module.exports = router;
