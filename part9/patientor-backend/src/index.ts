import express from 'express';

import patientsRouter from './routes/patients';
import diagnosesRouter from './routes/diagnoses';

const app = express();
app.use(express.json());

const PORT = 3001;

app.get('/api/ping', (_req, res) => { 
  console.log('someone pinged here');
  res.status(200).json('pong');
});

app.use('/api/diagnosis', diagnosesRouter);
app.use('/api/patients', patientsRouter);
  
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});