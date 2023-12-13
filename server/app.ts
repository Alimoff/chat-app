const express = require('express');
const app = express();

app.set('view wngine', 'ejs');
app.use(express.static('public'));

export {app}
