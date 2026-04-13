import { useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import { useTranslation } from "react-i18next";
import {
  Box,
  Grid,
  Card,
  CardMedia,
  CardContent,
  Typography,
  Chip,
  Stack,
  TextField,
  Link
} from "@mui/material";
import { getBlogPosts } from "../constants/blogPosts";

const Blog = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const { t } = useTranslation();

  const BLOG_POSTS = getBlogPosts(t);

  const filteredPosts = BLOG_POSTS.filter(post =>
    post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
    post.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Box sx={{ py: 6, px: { xs: 2, sm: 4, md: 8 }, flex: 1 }}>
      <TextField
        fullWidth
        variant="outlined"
        placeholder={t("searchPlaceholder")}
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        sx={{ mb: 4 }}
      />

      <Grid container spacing={4} justifyContent="center" alignItems="stretch">
        {filteredPosts.length > 0 ? (
          filteredPosts.map(post => (
            <Grid size={{ xs: 12, sm: 6, md: 6 }} key={post.id} display="flex">
              <Link component={RouterLink} to={`/Blogs/${post.id}`} sx={{ textDecoration: "none" }}>
                <Card
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    width: 480,
                    height: 400,
                    boxShadow: 3,
                    borderRadius: 2,
                  }}
                >
                  <CardMedia
                    component="img"
                    sx={{ height: 180, objectFit: "cover" }}
                    image={post.image}
                    alt={post.title}
                  />
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Chip
                      label={post.category}
                      variant="outlined"
                      size="small"
                      sx={{ mb: 1 }}
                    />
                    <Link component={RouterLink} to={`/Blogs/${post.id}`} sx={{ textDecoration: "none" }}>
                      <Typography variant="h6" color="primary">
                        {post.title}
                      </Typography>
                    </Link>
                    <Typography variant="body2" color="text.secondary" mt={1}>
                      {post.excerpt}
                    </Typography>
                    <Stack direction="row" justifyContent="space-between" mt={2}>
                      <Typography variant="caption">{t("by")} {post.author}</Typography>
                      <Typography variant="caption">{post.date}</Typography>
                    </Stack>
                  </CardContent>
                </Card>
              </Link>
            </Grid>
          ))
        ) : (
          <Box textAlign="center" mt={8} width="100%">
            <Typography variant="h6">{t("noArticles")}</Typography>
            <Typography color="text.secondary">{t("adjustSearch")}</Typography>
          </Box>
        )}
      </Grid>
    </Box>
  );
};

export default Blog;
