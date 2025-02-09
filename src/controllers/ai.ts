import { RequestHandler } from "express";
import { authenticateUser } from "../services/auth";

export const generateRecipe: RequestHandler = async (req, res) => {
  await authenticateUser(req);
  const apiKey = process.env.OPENAI_KEY;
  const endpoint = "https://api.openai.com/v1/chat/completions";
  const ingredients = req.body.ingredients;
  const payload = {
    model: "gpt-4o-mini",
    messages: [
      {
        role: "system",
        content:
          "You are a culinary expert. Generate recipes based on a provided list of ingredients.",
      },
      {
        role: "user",
        content: `Given the following ingredients ${ingredients.join()}, make the recipe`,
      },
    ],
    response_format: {
      type: "json_schema",
      json_schema: {
        name: "recipe_response",
        strict: true,
        schema: {
          type: "object",
          properties: {
            title: {
              type: "string",
              description: "Title of the recipe",
            },
            ingredients: {
              type: "array",
              description: "List of ingredients",
              items: {
                type: "object",
                properties: {
                  name: {
                    type: "string",
                    description: "Name of the ingredient",
                  },
                  amount: {
                    type: "string",
                    description:
                      "Name of the ingredient. Eg: 2kg, 3 units, 2 teaspoons, etc",
                  },
                },
                additionalProperties: false,
                required: ["name", "amount"],
              },
            },
            steps: {
              type: "array",
              description: "Steps of the recipe",
              items: {
                type: "object",
                properties: {
                  description: {
                    type: "string",
                    description: "Description of the step",
                  },
                },
                required: ["description"],
                additionalProperties: false,
              },
            },
          },
          additionalProperties: false,
          required: ["title", "ingredients", "steps"],
        },
      },
    },
  };

  try {
    const response = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.status} ${await response.text()}`);
    }

    const data = await response.json();
    const message = data.choices[0].message.content;
    const recipe = JSON.parse(message);

    res.status(200).json(recipe);
  } catch (error) {
    console.error("Error in API call:", error);
    res.status(500).json({ message: error.message });
  }
};
