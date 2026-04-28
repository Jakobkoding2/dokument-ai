/**
 * DokumentAI - Hovedserver
 */
require('dotenv').config();

const express = require('express');
const cors = require('cors');
const compression = require('compression');
const helmet = require('helmet');
const morgan = require('morgan');
const path = require('path');
const fs = require('fs');

const { globalErrorHandler } = require('./middleware/errorHandler');
const processRoutes = require('./routes/process');
const jobRoutes = require('./routes/jobs');
const exportRoutes = require('./routes/export');
const adminRoutes = require('./routes/admin');

const app = express();
const PORT = parseInt(process.env.PORT, 10) || 3001;
const isDemoMode = process.env.DEMO_MODE === 'true';
const uploadDir = path.join(__dirname, 'tmp', 'uploads');
if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true });

app.use(helmet());
app.use(compression());
app.use(cors());
app.use(express.json({ limit: '1mb' }));
app.use(express.urlencoded({ extended: true }));
app.use(process.env.NODE_ENV === 'production' ? morgan('combined') : morgan('dev'));

app.use('/api/v1/process', processRoutes);
app.use('/api/v1/jobs', jobRoutes);
app.use('/api/v1/export', exportRoutes);
app.use('/api/v1/admin', adminRoutes);

app.get('/api/v1/health', (_req, res) => {
  res.json({
    status: 'ok',
    tjeneste: 'DokumentAI',
    versjon: process.env.npm_package_version || '1.0.0',
    modus: isDemoMode ? 'demo' : 'produksjon',
    tidspunkt: new Date().toISOString(),
  });
});

app.use((_req, res) => {
  res.status(404).json({ feil: true, melding: 'Endepunktet ble ikke funnet. Sjekk URL-en og prov igjen.' });
});

app.use(globalErrorHandler);
app.listen(PORT, () => {
  console.log(`DokumentAI server kjorer pa port ${PORT}`);
});

module.exports = app;
