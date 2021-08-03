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
const fs = require('fs');
const os = require('os');


/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 *    The code
 */
var nodeHostname = null;
if (fs.existsSync('/data/node-hostname')) {
  nodeHostname = fs.readFileSync('/data/node-hostname', 'utf8').replace(/(\r\n|\n|\r)/gm, "").trim();
}

const router = express.Router();

router.get('/', function (req, res) {
  let info = {
    domain: req.headers.host,
    // Real node hostname
    nodeHostmane: nodeHostname,
    // Container info
    containerHostname: os.hostname(),
    containerAddress: req.socket.localAddress,
    containerPort: req.socket.localPort,
    // IP & port of reverse proxy
    remoteAddress: req.socket.remoteAddress,
    remotePort: req.socket.remotePort,
    // Real client IP of forwarded request from reverse proxy
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
