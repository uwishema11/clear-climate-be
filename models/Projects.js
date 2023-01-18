const mongoose = require('mongoose');
const joi = require('joi')
// const slugify = require('slugify');

const projectSchema = new mongoose.Schema(
  {
    title: {
      type: String
    },
   
    author: {
      type: String,
      required: [true, 'a project must have an author'],
    },
    
    body: {
      type: String,
      trim: true,
    },
    images: [String],
    createdAt: {
      type: Date,
      default: Date.now(),
    },
    startDates: [Date],
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

projectSchema.virtual('durationWeeks').get(function () {
  return this.duration / 7;
});


const projectAuthSchema =joi.object({
    title:joi.string().required(),
    body:joi.string().required(),
    author:joi.string().required()
 });


// DOCUMENT MIDDLEWARE : RUNS BEFORE .SAVE() AND .CREATE ()

// tourSchema.pre('save',function(){
//     this.slug =slugify(this.name,{lower :true})
// })

const Project = mongoose.model('Project', projectSchema);
module.exports.projectAuthSchema = projectAuthSchema;
module.exports.Project = Project;
