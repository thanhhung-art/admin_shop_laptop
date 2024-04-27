"use client";

import { IReview } from "@/types/reviews";
import { FetchData, getReviewsInfinity } from "@/utils/fetch";
import { GetReviewsInfinity } from "@/utils/keys";
import {
  Box,
  Container,
  FormControl,
  List,
  ListItem,
  Select,
  Stack,
  Typography,
  SelectChangeEvent,
  MenuItem,
  Button,
  Rating,
  Card,
} from "@mui/material";
import { useInfiniteQuery, useMutation } from "@tanstack/react-query";
import { useMemo, useState } from "react";
import Image from "next/image";

const ReviewPage = () => {
  const [filter, setFilter] = useState<"all" | "good" | "normal" | "bad">(
    "all"
  );
  const { data } = useInfiniteQuery([GetReviewsInfinity], ({ pageParam = 0 }) =>
    getReviewsInfinity(pageParam)
  );

  const verifyReviewMutation = useMutation({
    mutationFn: ({
      reviewId,
      data,
    }: {
      reviewId: string;
      data?: { checked: boolean };
    }) => {
      if (data) {
        return FetchData.put("/reviews/" + reviewId, data);
      }

      return FetchData.delete("/reviews/" + reviewId);
    },
  });

  const handleVerifyReview = (
    reviewId: string,
    data?: { checked: boolean }
  ) => {
    verifyReviewMutation.mutate({ reviewId, data });
  };

  const handleChange = (event: SelectChangeEvent) => {
    switch (event.target.value) {
      case "all":
      case "good":
      case "normal":
      case "bad":
        setFilter(event.target.value);
    }
  };

  const reviews = useMemo(() => {
    if (!data) return [];

    return data.pages.reduce((acc, curr) => {
      return acc.concat(curr.data.reviews);
    }, [] as IReview[]);
  }, [data]);

  const reviewsWithFilter = useMemo(() => {
    return reviews.filter((r) => {
      if (filter === "good") {
        return r.rating >= 4 && r.rating <= 5;
      } else if (filter === "normal") {
        return r.rating === 3;
      } else if (filter === "bad") {
        return r.rating <= 2 && r.rating >= 1;
      } else {
        return "all";
      }
    });
  }, [filter, reviews]);

  return (
    <Box
      component="main"
      sx={{
        flexGrow: 1,
        py: 8,
      }}
    >
      <Container maxWidth="xl">
        <Typography variant="h4" component="h1" sx={{ mb: 2 }}>
          Reviews
        </Typography>
        <Stack alignItems="end">
          <Box minWidth={120}>
            <FormControl fullWidth>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={filter}
                label="Age"
                onChange={handleChange}
              >
                <MenuItem value="all">all</MenuItem>
                <MenuItem value="good">Good</MenuItem>
                <MenuItem value="normal">Normal</MenuItem>
                <MenuItem value="bad">Bad</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </Stack>
        <List>
          {reviewsWithFilter.map((review) => (
            <ListItem key={review._id}>
              <Card sx={{ padding: 3 }}>
                <Stack direction="row" spacing={4}>
                  <Box sx={{ minWidth: 150 }}>
                    <Typography variant="h6">
                      <b>{review.username}</b>
                    </Typography>
                    <Typography>
                      <b>{review.customerPhone}</b>
                    </Typography>
                  </Box>

                  <Box>
                    <Box>
                      <Typography variant="h6" fontSize={16} color="GrayText">
                        {review.productName}
                      </Typography>
                    </Box>

                    <Box sx={{ margin: "0.3rem 0" }}>
                      <Stack direction="row" spacing={2} alignItems="center">
                        <Rating value={review.rating} readOnly />
                        <Typography variant="h6">
                          <b>Good</b>
                        </Typography>
                      </Stack>
                    </Box>

                    <Box sx={{ margin: ".5rem 0" }}>
                      <Typography color="black" variant="h6">
                        {review.review}
                      </Typography>
                    </Box>

                    {review.images && (
                      <Stack direction="row">
                        {review.images.map((image, i) => (
                          <Box key={i} sx={{ height: 40, width: 80 }}>
                            <Image src={image} alt="image" fill />
                          </Box>
                        ))}
                        <Box></Box>
                      </Stack>
                    )}
                  </Box>
                </Stack>

                <Stack direction="row" spacing={2} justifyContent="end">
                  <Button
                    color="error"
                    variant="contained"
                    onClick={() => handleVerifyReview(review._id)}
                  >
                    refuse
                  </Button>
                  <Button
                    color="success"
                    variant="contained"
                    onClick={() =>
                      handleVerifyReview(review._id, { checked: true })
                    }
                  >
                    accept
                  </Button>
                </Stack>
              </Card>
            </ListItem>
          ))}
        </List>
      </Container>
    </Box>
  );
};

export default ReviewPage;
