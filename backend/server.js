require('dotenv').config();

const express     = require('express');
const app        = express();
const cors        = require('cors');
const bodyParser  = require('body-parser');
const path        = require('path');
const multer      = require('multer');
const jwt         = require('jsonwebtoken');
const swaggerUi   = require('swagger-ui-express');
const swaggerDoc  = require('./documentation/swagger.json');

const sequelize        = require('./db/sequelize');
const utilisateurRoutes         = require('./routes/userRoutes');
const resourceRoutes            = require('./routes/resourceRoutes');
const relationRoutes            = require('./routes/relationRoutes');
const categoryResourceRoutes    = require('./routes/categoryResourceRoutes');
const typesResourceRoutes       = require('./routes/typesResourceRoutes');
const favorisRoutes             = require('./routes/favorisRoutes');
const progressionActiviteRoutes = require('./routes/progressionActiviteRoutes');
const invitationRoutes          = require('./routes/invitationsRoutes');
const friendshipRoutes          = require('./routes/friendshipRoutes');
const commentRoutes             = require('./routes/commentRoutes');
const dashboardRoutes           = require('./routes/dashboardRoutes');
const messageRoutes             = require('./routes/messageRoutes');
const expressOasGenerator = require('express-oas-generator');
expressOasGenerator.init(app, {});
const PORT = process.env.PORT || 3000;

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename:    (req, file, cb) => cb(null, Date.now() + '-' + file.originalname),
});
const upload = multer({ storage });

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

const verifyToken = (req, res, next) => {
  let token = req.headers['authorization'];
  if (!token) return res.status(403).json({ message: 'Un token est requis.' });
  if (token.startsWith('Bearer ')) token = token.slice(7).trim();
  try {
    req.user = jwt.verify(token, process.env.JWT_SECRET);
    next();
  } catch {
    return res.status(401).json({ message: 'Token invalide.' });
  }
};

app.get('/api', (req, res) => {
  res.json({ message: 'Bienvenue sur l’API backend 🚀' });
});
app.use('/api/utilisateurs', utilisateurRoutes);
app.use('/api/users',        utilisateurRoutes);
app.use('/api/resources',     resourceRoutes);
app.use('/api/relations',     relationRoutes);
app.use('/api/categories',    categoryResourceRoutes);
app.use('/api/types_ressource', typesResourceRoutes);
app.use('/api/favoris',       favorisRoutes);
app.use('/api/progression',   progressionActiviteRoutes);
app.use('/api/invitations',   invitationRoutes);
app.use('/api/friendships',   friendshipRoutes);
app.use('/api/comments',      commentRoutes);
app.use('/api/dashboard',     dashboardRoutes);
app.use('/api',               messageRoutes);

app.use(
  '/api-docs',
  swaggerUi.serve,
  swaggerUi.setup(swaggerDoc)
);

app.use((err, req, res, next) => {
  console.error('Erreur interne :', err.message);
  res.status(500).json({ message: 'Une erreur interne est survenue.' });
});

sequelize.authenticate()
  .then(() => {
    console.log('Connexion à la base de données réussi !');
    app.listen(PORT, () => {
      console.log(`✅ Serveur sur http://10.176.131.156:${PORT}`);
      console.log(`📘 Docs Swagger : http://10.176.131.156:${PORT}/api-docs`);
    });
  })
  .catch(err => {
    console.error('Erreur connexion DB :', err.message);
  });
