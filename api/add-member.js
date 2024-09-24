import fetch from "node-fetch";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { email, phone } = req.body;

    const apiKey = "pk_44fefcc04d447ec722b728c58f9d5583b2";
    const listId = "TKuJyq";

    // URL de la nueva API
    const url = `https://a.klaviyo.com/api/events/`;

    const data = {
      data: {
        type: "profile",
        attributes: {
          email: email,
          phone_number: phone,
        },
        relationships: {
          list: {
            data: [{ id: listId, type: "list" }],
          },
        },
      },
    };

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          Accept: "application/json",
          Authorization: `Klaviyo-API-Key ${apiKey}`,
          "Content-Type": "application/json",
          revision: '2024-09-24'
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        return res.status(200).json({ message: "Perfil añadido con éxito" });
      } else {
        const errorData = await response.json();
        console.error("Error de Klaviyo:", errorData); // Log de error
        return res
          .status(response.status)
          .json({ message: "Error en Klaviyo", error: errorData });
      }
    } catch (error) {
      console.error("Error en el servidor:", error); // Log de error
      return res.status(500).json({ message: "Error en el servidor", error });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
