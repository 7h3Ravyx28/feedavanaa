const API_KEY = "pub_16ca78c635a54028a950f1afb2d10c46"; 
const BASE_URL = "https://newsdata.io/api/1/news";

export const fetchNews = async (query = "cyber OR startup OR crime", lang = "en") => {
  const url = `${BASE_URL}?apikey=${API_KEY}&q=${encodeURIComponent(query)}&language=${lang}&image=1`;

  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error("Failed to fetch news from NewsData.io");

    const data = await res.json();

    if (!data.results) throw new Error("Invalid response structure");

    
    return data.results.map((item) => ({
      title: item.title,
      description: item.description,
      image: item.image_url,
      source: item.source_id,
      url: item.link,
      publishedAt: item.pubDate,
    }));
  } catch (err) {
    console.error("News fetch error:", err.message);
    return [];
  }
};
