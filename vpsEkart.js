const express = require('express');
const path = require('path');

const app = express();

// ✅ Serve Angular static files
app.use(express.static(path.join(__dirname, 'dist/webapp/browser')));

// ✅ Fallback for Angular routes (Express 5 regex syntax)
app.get(/.*/, (req, res) => {
  res.sendFile(path.join(__dirname, 'dist/webapp/browser/index.html'));
});

// ✅ Start the server
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`✅ Angular app running at http://localhost:${PORT}`);
});
