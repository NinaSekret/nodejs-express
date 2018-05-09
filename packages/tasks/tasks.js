const router = require('express').Router();
const db = require('../db/db');
const { validate } = require('jsonschema');

const newForm = text => ({
  id: String(Math.random()
    .toString(16)
    .split('.')[1]),
  text,
  isCompleted: false,
});

router.use('/:id', (req, res, next) => {
  const task = db.get('forms')
    .find({ id: req.params.id })
    .value();

  if (!form) {
    next(new Error('CAN_NOT_FIND_FORM'));
  }
});

// GET /forms
router.get('/', (req, res) => {
  const forms = db.get('forms').value();
  res.json({ status: 'OK', data: forms });
});

// GET /forms/:id
router.get('/:id', (req, res) => {
  const form = db
    .get('forms')
    .find({ id: req.params.id })
    .value();

  res.json({ status: 'OK', data: form });
});

// POST /forms
router.post('/', (req, res, next) => {
  // const requestBodySchema = {
  //   id: 'path-task',
  //   type: 'object',
  //   properties: { text: { type: 'string' } },
  //   required: ['text'],
  //   additionalProperties: false,
  // };
  //
  // if (!validate(req.body, requestBodySchema).valid) {
  //   next(new Error('INVALID_API_FORMAT'));
  // }

  const form = newForm(req.body.text);

  console.log(form);

  db
    .get('forms')
    .push(form)
    .write();

  res.json({ status: 'OK', data: form });
});

// PATCH /forms/:id
router.patch('/:id', (req, res, next) => {
  // const requestBodySchema = {
  //   id: 'path-task',
  //   type: 'object',
  //   properties: {
  //     text: { type: 'string' },
  //     isCompleted: { type: 'boolean' },
  //   },
  //   additionalProperties: false,
  //   minProperties: 1,
  // };
  //
  // if (!validate(req.body, requestBodySchema).valid) {
  //   next(new Error('INVALID_API_FORMAT'));
  // }

  const form = db
    .get('forms')
    .find({ id: req.params.id })
    .assign(req.body)
    .value();

  db.write();

  res.json({ status: 'OK', data: form });
});

// DELETE /tasks/:id
router.delete('/:id', (req, res) => {
  db
    .get('forms')
    .remove({ id: req.params.id })
    .write();

  res.json({ status: 'OK' });
});

module.exports = router;
