// NewsCard.jsx
"use client";

import { Card, CardContent, CardMedia, Typography } from "@mui/material";
import { useRouter } from "next/navigation";

const NewsCard = ({ id, title, image, source, time, description, ...fullData }) => {
  const router = useRouter();

  const handleClick = () => {
    const encoded = encodeURIComponent(JSON.stringify(fullData));
    router.push(`/article/${id}?data=${encoded}`);
  };

  return (
    <Card
      onClick={handleClick}
      sx={{
        display: "flex",
        flexDirection: "column",
        flex: 1,
        height: "100%",
        borderRadius: 3,
        overflow: "hidden",
        background: "rgba(255, 255, 255, 0.05)",
        backdropFilter: "blur(10px)",
        color: "#fff",
        border: "1px solid rgba(255,255,255,0.1)",
        transition: "0.3s",
        cursor: "pointer",
        "&:hover": {
          transform: "scale(1.03)",
          boxShadow: "0 0 20px #ff008066",
        },
      }}
    >
      <CardMedia
        component="img"
        image={image || "/placeholder.jpg"}
        alt={title}
        sx={{
          width: "100%",
          height: 180,
          objectFit: "cover",
        }}
      />

      <CardContent sx={{ flexGrow: 1, display: "flex", flexDirection: "column" }}>
        <Typography
          variant="subtitle1"
          sx={{
            fontWeight: 600,
            color: "#fff",
            mb: 1,
            overflow: "hidden",
            textOverflow: "ellipsis",
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
          }}
        >
          {title}
        </Typography>

        <Typography
          variant="body2"
          sx={{
            color: "#ccc",
            overflow: "hidden",
            textOverflow: "ellipsis",
            display: "-webkit-box",
            WebkitLineClamp: 3,
            WebkitBoxOrient: "vertical",
            mb: "auto",
          }}
        >
          {description || "No summary available."}
        </Typography>

        <Typography variant="body2" color="#aaa" noWrap>
          {typeof source === "string" ? source : source?.name || "Unknown"} • {time}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default NewsCard;
