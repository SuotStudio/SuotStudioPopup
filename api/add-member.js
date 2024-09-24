import fetch from 'node-fetch';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { email, phone } = req.body;

    // Asegúrate de tener la clave API correcta
    const apiKey = 'pk_942208a1ccfdbd9b4eeee6f73fa5fac7e4';
    const listId = 'TKuJyq';

    const url = `https://a.klaviyo.com/api/v2/list/${listId}/members`;

    const data = {
      profiles: [
        {
          email: email,
          phone_number: phone,
        },
      ],
    };

    console

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
        const errorData = await response.json();
        console.error('Error en la API de Klaviyo:', errorData);
        res.status(500).json({ message: 'Error en la API de Klaviyo', error: errorData });
      }
    } catch (error) {
      console.error('Error en el servidor:', error);
      res.status(500).json({ message: 'Error en el servidor', error });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}