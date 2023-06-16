import performSearch from "@/Helper/TF-IDF-implimentation-main"

export default async function handler(req, res) {
  if (req.method === 'GET') {
    const { strings } = req.query;
    console.log(typeof(strings));
    try {
      const myQuery = JSON.parse(strings);
      const searchResults = await performSearch(myQuery);
      res.status(200).json(searchResults);
    } catch (error) {
      // Handle any errors that occur during the search
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  } else {
    res.status(405).json({ error: 'Method Not Allowed' });
  }
}
