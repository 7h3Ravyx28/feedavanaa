"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { fetchNews } from "@/Services/gnewsAPI";
import { Container, Typography, CircularProgress, Box, Button } from "@mui/material";

const categoryKeywords = {
  startup: "startup funding founder",
  cyber: "cybersecurity hacker breach",
  crime: "crime theft murder",
};

export default function CategoryPage() {
  const { slug } = useParams();
  const router = useRouter();
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);

  const query = categoryKeywords[slug] || slug;

  useEffect(() => {
    const loadNews = async () => {
      try {
        const data = await fetchNews(query);
        setNews(data);
      } catch (err) {
        console.error("Error loading category:", err);
      } finally {
        setLoading(false);
      }
    };

    loadNews();
  }, [slug]);

  const handleClick = (article, idx) => {
    const encoded = encodeURIComponent(JSON.stringify(article));
    router.push(`/article/${idx}?data=${encoded}`);
  };

  return (
    <Container maxWidth="md" sx={{ mt: 6, color: "#fff" }}>
      <Typography variant="h4" gutterBottom textTransform="capitalize" fontFamily="Rajdhani">
        {slug} News 🗂️
      </Typography>

      {loading ? (
        <CircularProgress sx={{ mt: 4 }} />
      ) : news.length === 0 ? (
        <Typography variant="body1" sx={{ mt: 4 }}>
          No articles found.
        </Typography>
      ) : (
        news.map((item, idx) => (
          <Box
            key={idx}
            sx={{
              mb: 4,
              background: "rgba(255,255,255,0.05)",
              borderRadius: 3,
              border: "1px solid rgba(255,255,255,0.1)",
              overflow: "hidden",
              backdropFilter: "blur(10px)",
              p: 2,
              cursor: "pointer",
              transition: "0.3s",
              "&:hover": {
                transform: "scale(1.01)",
                boxShadow: "0 0 10px #0ff",
              },
            }}
            onClick={() => handleClick(item, idx)}
          >
            {item.image_url && (
              <Box
                component="img"
                src={item.image_url}
                alt={item.title}
                sx={{
                  width: "100%",
                  height: 200,
                  objectFit: "cover",
                  borderRadius: 2,
                  mb: 2,
                }}
              />
            )}

            <Typography variant="h6" fontWeight="bold" fontFamily="Rajdhani" gutterBottom>
              {item.title}
            </Typography>

            <Typography variant="body2" color="#aaa" mb={1}>
              {item.source_id || "Unknown Source"} •{" "}
              {new Date(item.pubDate).toLocaleString()}
            </Typography>

            <Typography variant="body2" color="#ccc" mb={2}>
              {item.description?.slice(0, 150) || "No preview available..."}...
            </Typography>

            <Button
              size="small"
              variant="outlined"
              sx={{
                borderColor: "#fff",
                color: "#fff",
                "&:hover": { backgroundColor: "#fff", color: "#000" },
              }}
            >
              Read Full →
            </Button>
          </Box>
        ))
      )}
    </Container>
  );
}
