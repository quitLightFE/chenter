"use client";

import React from "react";
import {
  Container,
  Grid,
  Card,
  CardContent,
  Typography,
  Box
} from "@mui/material";

import CodeIcon from "@mui/icons-material/Code";
import SpeedIcon from "@mui/icons-material/Speed";
import ElectricBoltIcon from "@mui/icons-material/ElectricBolt";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import SchoolIcon from "@mui/icons-material/School";
import GroupsIcon from "@mui/icons-material/Groups";

import { features } from "@/features/landing/data/features";

export default function FeaturesSection() {
  return (
    <Box
      sx={{
        // backgroundColor: '#0A0E1A',
        backgroundColor: "background.paper",
        py: { xs: 8, md: 12 },
        // minHeight: '100vh',
        display: "flex",
        alignItems: "center"
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          {features.map((item, index) => (
            <Grid size={{ xs: 12, sm: 6, md: 4 }} key={index}>
              <Card
                sx={{
                  height: "100%",
                  //backgroundColor: '#151D30',
                  backgroundColor: "background.light",
                  borderRadius: "16px",
                  boxShadow: "0 2px 10px rgba(0, 0, 0, 0.2)",
                  transition: "transform 0.3s ease, box-shadow 0.3s ease",
                  "&:hover": {
                    transform: "translateY(-8px)",
                    boxShadow: "0 4px 20px rgba(0, 0, 0, 0.3)"
                  }
                }}
              >
                <CardContent sx={{ p: 5 }}>
                  {/* Иконка */}
                  <Box
                    sx={{
                      backgroundColor: item.iconBg,
                      width: 44,
                      height: 44,
                      borderRadius: "8px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      mb: 3
                    }}
                  >
                    {item.icon}
                  </Box>

                  {/* Заголовок */}
                  <Typography
                    variant="h5"
                    component="h3"
                    sx={{
                      color: "text.primary",
                      fontWeight: 600,
                      mb: 2,
                      fontSize: "22px"
                    }}
                  >
                    {item.title}
                  </Typography>

                  {/* Описание */}
                  <Typography
                    variant="body1"
                    sx={{
                      color: "#8A99AD",
                      lineHeight: 1.7,
                      fontSize: "15px"
                    }}
                  >
                    {item.desc}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}
