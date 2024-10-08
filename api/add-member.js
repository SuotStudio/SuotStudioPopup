import fetch from "node-fetch";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { email, location } = req.body; // Asegúrate de que envías el correo y el teléfono

    const apiKey = "pk_44fefcc04d447ec722b728c58f9d5583b2";
    const listId = "TKuJyq";

    const url = `https://a.klaviyo.com/api/profile-subscription-bulk-create-jobs/`;

    const data = {
      data: {
        type: "profile-subscription-bulk-create-job",
        attributes: {
          profiles: {
            data: [
              {
                type: "profile",
                attributes: {
                  subscriptions: {
                    email: { marketing: { consent: "SUBSCRIBED" } },
                  },
                  email: email,
                },
              },
            ],
          },
          historical_import: false,
        },
        relationships: {
          list: { data: { type: "list", id: listId } },
        },
      },
    };

    console.log("URL", url, data); // Para depuración

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          Accept: "application/json",
          Authorization: `Klaviyo-API-Key ${apiKey}`,
          "Content-Type": "application/json",
          revision: "2024-07-15", // Fecha actual en formato YYYY-MM-DD
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        return res.status(200).json({ message: "Perfil suscrito con éxito" });
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
