const {Project,projectAuthSchema} = require('./../models/Projects');

const catchAsync = require('../utils/catchAsync');

exports.createProject = catchAsync(async (req, res, next) => {
 const result=await projectAuthSchema.validate(req.body);
         const {error}=result
         if(error) return res.status(404).json({
             message: error.details[0].message
         });
         let project= await Project.findOne({title:req.body.title});
         if(project) return res.status(404).json({
             message:"the project already exists"
         });

  const newProject = {
    title: req.body.title,
    body: req.body.body,
    author: req.body.author,
  };
  const created = await Project.create(newProject);

  res.status(200).json({
    status: true,
    data: created,
  });
});

exports.getAllProjects = catchAsync(async (req, res, next) => {
  console.log(req.headers);
  const projects = await Project.find();
  res.status(200).json({
    status: true,
    results: projects.length,
    data: {
      projects,
    },
  });
});

exports.deleteProject = catchAsync(async (req, res, next) => {
  await Project.findByIdAndDelete(req.params.id);
  res.status(200).json({
    status: true,
    message: 'successfully deleted',
  });
});

exports.getProject = catchAsync(async (req, res, next) => {
  const project = await Project.findById(req.params.id);
  res.status(200).json({
    status: true,
    data: {
      project,
    },
  });
});

exports.updateProjectes = catchAsync(async (req, res, next) => {
  const updatedProject = await Project.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });
  res.status(200).json({
    status: true,
    data: {
      updatedProject,
    },
  });
});
