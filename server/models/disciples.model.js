const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');

const disciplineSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  subDisciplines: {
    type: Array,
    required: true,
  },
});

// add plugin that converts mongoose to json
disciplineSchema.plugin(toJSON);
disciplineSchema.plugin(paginate);

/**
 * @typedef Discipline
 */
const Discipline = mongoose.model('disciplines', disciplineSchema);

module.exports = Discipline;
