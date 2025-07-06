"use client";

import {
  Container,
  Typography,
  CircularProgress,
  Grid,
} from "@mui/material";
import { useEffect, useState } from "react";
import NewsCard from "../components/NewsCard";
import { fetchNews } from "../Services/gnewsAPI";

export default function Home() {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const data = await fetchNews("cybercrime OR startup OR hacker");
        setNews(data);
      } catch (err) {
        console.error("Error loading news:", err);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  return (
    <Container maxWidth="lg" sx={{ mt: 6 }}>
      <Typography
        variant="h4"
        gutterBottom
        sx={{ color: "#fff", textAlign: "center" }}
      >
        Latest News 🧠
      </Typography>

      {loading ? (
        <CircularProgress sx={{ display: "block", mx: "auto", color: "#fff" }} />
      ) : (
        <Grid container spacing={4}>
          {news.map((item, idx) => (
            <Grid
              item
              xs={12}
              sm={6}
              md={4}
              key={idx}
              sx={{ display: "flex", alignItems: "stretch" }}
            >
              <NewsCard
                id={idx}
                title={item.title}
                description={item.description}
                image={item.image}
                source={item.source}
                time={new Date(item.publishedAt).toLocaleString()}
                {...item}
              />
            </Grid>
          ))}
        </Grid>
      )}
    </Container>
  );
}
