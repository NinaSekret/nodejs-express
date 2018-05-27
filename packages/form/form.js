const router = require('express').Router();
const db = require('../db/db');
const { validate } = require('jsonschema');


const newForm = requestBody => {
  const allowedReqParams = [
    "fio",
    "old-surname",
    "position",
    "work-start-time",
    "phone-number",
    "email",
    "skype",
    "serial",
    "number",
    "issued",
    "birthday",
    "place-of-birth",
    "registration-address",
    "home-address"
  ];
  var result = {
    id: String(Math.random()
    .toString(16)
    .split('.')[1])
  };

  for (var i = 0; i < allowedReqParams.length; i++) {
    result[allowedReqParams[i]] = requestBody[allowedReqParams[i]];
  };

  return result;
};

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
  const form = newForm(req.body);
  db
  .get('forms')
  .push(form)
  .write();

  res.json({ status: 'OK', data: form });
});

// PATCH /forms/:id
router.patch('/:id', (req, res, next) => {
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
