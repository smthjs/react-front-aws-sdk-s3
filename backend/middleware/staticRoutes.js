const path = require("path");

// For addresses that should give index.html, for example ["/", "/admin", "/news" ]
const routes = [
    "/"
]; 

const indexPath = path.resolve(__dirname, "..", "public","index.html");

module.exports = function(req, res, next) {

  const idx = routes.findIndex(x => x === req.path);
  if(idx !== -1)
  {
    return res.sendFile(indexPath);
  }

  if( !req.path.startsWith("/api") )
  {
    return res.status(404).send('404: Page Not Found');
  }

  return next();
};
