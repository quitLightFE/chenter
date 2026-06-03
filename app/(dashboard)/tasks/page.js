"use client";
import pb from "@/lib/pocketbase";
import { Box, Button,Typography } from "@mui/material";
import Link from "next/link";
import React, { useEffect, useState } from "react";

export default function Tasks() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    console.log(111);
    const inner = async () => {
      try {
        const data = await pb.collection("tasks").getFullList();
        console.log(data);

        setTasks(data);
      } catch (err) {
        console.log(err);
      } finally {
        console.log("finally");
      }
    };
    inner();
  }, []);

  return (
    <Box>
      {tasks.map((task) => (
        <Box key={task.id}>
        	<Typography>{task.title}</Typography>
        	<Typography>{task.description}</Typography>
          <Button
            variant="contained"
            component={Link}
            href={`/tasks/${task.id}`}
            sx={{ m: 1 }}
          >
            Начать
          </Button>
        </Box>
      ))}
    </Box>
  );
}
