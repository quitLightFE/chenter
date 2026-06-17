"use client";

import { use } from "react";

import { Box } from "@mui/material";

export default function page({ params }) {
  const { id } = use(params);
  return (
    <Box>
      <Box>{id}</Box>
    </Box>
  );
}
