const { Router } = require('express');
const logger = require('../../../services/logger');
const constants = require('../../../constants');
const controller = require('./controller');
const utils = require('../../../services/utils');

const router = new Router();

router.post('/', (req, res) => {
  const log = logger.createLog(`unpack:create:${req.headers['x-request-id']}`);
  log.log(constants.START_CREATE_UNLOCKED_PACKAGE);

  const fields = utils.checkRequiredFields(req.body, constants.CREATE_PACKAGE_REQUIRED_FIELDS);
  if (fields.length) {
    log.log(constants.REQUIRED_FIELDS_ERROR);
    const body = {
      status: constants.ERROR,
      error: {
        message: constants.REQUIRED_FIELDS_ERROR,
        missingFields: fields,
      },
    };
    log.log(body);
    return res.status(400).send(body);
  }
  controller.createUnlockedPackage(req.body, log)
    .then(() => log.log('Completed'))
    .catch((e) => log.log(`Error\n${e}`));
  return res.status(200).send('The process of creating an unlocked package has already begun.');
});

module.exports = router;
