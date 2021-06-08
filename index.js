const express = require('express');
// eslint-disable-next-line new-cap
const router = express.Router();
const cors = require('cors');
express.use(cors());

router.get('/', (req, res) => {
    res.send({ response: 'I am alive' }).status(200);
});

module.exports = router;