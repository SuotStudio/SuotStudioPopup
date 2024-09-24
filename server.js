import express from 'express';
import fetch from 'node-fetch';
import cors from 'cors';

const app = express();

app.use(cors());
app.use(express.json());


const apiKey = "pk_942208a1ccfdbd9b4eeee6f73fa5fac7e4";
const listId = "TKuJyq";

app.post('/add-member', async (req, res) => {
  const { email, phone } = req.body;

  const url = `https://a.klaviyo.com/api/v2/list/${listId}/members`;

  const data = {
    profiles: [
      {
        email: email,
        phone_number: phone,
      },
    ],
  };

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      },
      body: JSON.stringify(data),
    });

    if (response.ok) {
      res.status(200).json({ message: 'Perfil añadido con éxito' });
    } else {
      res.status(500).json({ message: 'Error al añadir el perfil' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error en la solicitud', error });
  }
});

app.listen(5173, () => {
  console.log('Servidor escuchando en http://localhost:5000');
});
