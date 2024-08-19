export default async function handler(req, res) {
    try {
      const response = await fetch("https://zenquotes.io/api/today/");
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      res.status(200).json(data);
    } catch (error) {
      console.error("Oh no! Error fetching the daily quote:", error);
      res.status(500).json({ error: 'AHH! Failed to fetch quote' });
    }
  }
  