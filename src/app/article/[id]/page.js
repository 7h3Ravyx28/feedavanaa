"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { Container, Typography, Box, Button } from "@mui/material";
import { useEffect, useState } from "react";

export default function ArticlePage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [article, setArticle] = useState(null);

  useEffect(() => {
    const encoded = searchParams.get("data");
    if (encoded) {
      try {
        const parsed = JSON.parse(decodeURIComponent(encoded));
        setArticle(parsed);
      } catch (err) {
        console.error("❌ Failed to parse article data:", err);
      }
    }
  }, [searchParams]);

  if (!article) {
    return (
      <Container maxWidth="md" sx={{ mt: 6, color: "#fff" }}>
        <Typography variant="h6">Invalid or missing article data.</Typography>
      </Container>
    );
  }

  return (
    <Container maxWidth="md" sx={{ mt: 6, color: "#fff" }}>
      {/* 🔙 Back */}
      <Button
        variant="outlined"
        onClick={() => router.back()}
        sx={{
          mb: 3,
          borderColor: "#fff",
          color: "#fff",
          fontFamily: "Rajdhani",
          "&:hover": {
            backgroundColor: "#fff",
            color: "#000",
          },
        }}
      >
        ← Back
      </Button>

      {/* 🖼️ Image */}
      {article.image_url || article.urlToImage ? (
        <Box
          component="img"
          src={article.image_url || article.urlToImage}
          alt={article.title}
          sx={{
            width: "100%",
            height: "auto",
            borderRadius: 2,
            mb: 3,
            objectFit: "cover",
          }}
        />
      ) : (
        <Box
          sx={{
            width: "100%",
            height: 200,
            background: "#333",
            borderRadius: 2,
            mb: 3,
          }}
        />
      )}

      {/* 📰 Title */}
      <Typography
        variant="h4"
        gutterBottom
        fontFamily="Rajdhani"
        fontWeight="bold"
      >
        {article.title}
      </Typography>

      {/* 📅 Source + Time */}
      <Typography variant="body2" color="#aaa" mb={1}>
        {article.source_id || article.source?.name || "Unknown Source"} •{" "}
        {new Date(article.pubDate || article.publishedAt).toLocaleString()}
      </Typography>

      {/* 📄 Description */}
      <Typography variant="body1" sx={{ mb: 3, fontSize: "1.1rem", lineHeight: 1.8 }}>
        {article.description || "No preview available for this article."}
      </Typography>

      {/* 🔗 Full Article Button */}
      <Button
        variant="outlined"
        href={article.link || article.url}
        target="_blank"
        rel="noopener noreferrer"
        sx={{
          borderColor: "#fff",
          color: "#fff",
          fontFamily: "Rajdhani",
          "&:hover": {
            backgroundColor: "#fff",
            color: "#000",
          },
        }}
      >
        🔗 Read Full Article
      </Button>
    </Container>
  );
}
