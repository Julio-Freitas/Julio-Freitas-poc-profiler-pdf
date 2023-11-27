import express from 'express';
import { Liquid } from 'liquidjs';

import { generatePDF } from './generator/index.js';
import fs from 'fs/promises';

import { avd_payload } from './modules/avd-payload.js';
import result from './modules/profiler-simple.js';

const app = express();
const engine = new Liquid({
  layouts: './layouts',
  partials: './partials',
});

app.engine('liquid', engine.express());
app.set('views', './views');
app.set('view engine', 'liquid');

app.use(express.static('public'));

app.get('/profiler/:language?', async (req, res) => {
  const { language } = req.params;
  engine
    .parseFile(`./views/pdf-simple-${language || 'pt-br'}.liquid`)
    .then((template) =>
      engine.render(template, { ...result[language || 'pt-br'] }),
    )
    .then((page) => res.send(page));
});

app.get('/profiler/pdf/:language?', async (req, res) => {
  const { language } = req.params;
  /** get file template */
  const template = await fs.readFile(
    `./views/pdf-simple-${language || 'pt-br'}.liquid`,
    'utf-8',
  );

  const html = await engine.parseAndRender(template, {
    ...result[language || 'pt-br'],
  });

  const pdf = await generatePDF({ html });

  res.setHeader('Content-Type', 'application/pdf');
  res.setHeader('Content-Disposition', 'attachment; filename=reports.pdf');
  res.status(200).send(pdf);
});

app.get('/avd', async (req, res) => {
  // Renderize o template Liquid com os dados
  engine
    .parseFile('./views/avd.liquid')
    .then((template) => engine.render(template, { ...avd_payload }))
    .then((page) => res.send(page));
});

app.get('/avd/pdf', async (req, res) => {
  /** get file template */
  const template = await fs.readFile('./views/avd.liquid', 'utf-8');

  const html = await engine.parseAndRender(template, {
    ...avd_payload,
  });

  const pdf = await generatePDF({ html });

  res.setHeader('Content-Type', 'application/pdf');
  res.setHeader('Content-Disposition', 'attachment; filename=reports.pdf');
  res.status(200).send(pdf);
});

const PORT = process.env.PORT || 3005;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
