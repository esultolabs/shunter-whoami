/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 *                                                                                                 *
 *    Copyright (c) 2021 Sgobbi Federico                                                           *
 *    All rights reserved.                                                                         *
 *                                                                                                 *
 *    This file is licensed under the MIT License.                                                 *
 *    License text available at https://opensource.org/licenses/MIT                                *
 *                                                                                                 *
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */


/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 *    Import externals
 */
const express = require('express');
const os = require('os');


/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 *    The code
 */
const router = express.Router();

router.get('/', function (req, res) {
  let info = {
    domain: req.headers.host,
    containerID: os.hostname(),
    containerAddress: req.socket.localAddress,
    containerPort: req.socket.localPort,
    remoteAddress: req.socket.remoteAddress,
    remotePort: req.socket.remotePort,
    forwardedIP: req.headers['x-forwarded-for'] || null
  }

  if (req.wantsJSON) {
    res.json(info);
  } else {
    res.render('index', info);
  }
});


/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 *    Module export
 */
module.exports = router;
