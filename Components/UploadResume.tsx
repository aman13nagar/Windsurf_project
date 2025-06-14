import React, { useCallback, useRef, useState } from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  IconButton,
  LinearProgress,
  Stack,
  Typography,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import UploadFileRoundedIcon from "@mui/icons-material/UploadFileRounded";
import CloudUploadRoundedIcon from "@mui/icons-material/CloudUploadRounded";
import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { motion } from "framer-motion";

/**
 * A visually‑polished, drag‑and‑drop résumé uploader.
 * After successful extraction the parsed JSON is stored in localStorage
 * and the user is redirected to `/summary`.
 */
export const UploadResume: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [progress, setProgress] = useState<number>(0);
  const [status, setStatus] = useState<"idle" | "uploading" | "done">("idle");
  const inputRef = useRef<HTMLInputElement | null>(null);
  const navigate = useNavigate();

  const handleSelectFile = useCallback(() => {
    inputRef.current?.click();
  }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files?.[0];
    if (selected) {
      setFile(selected);
      setProgress(0);
      setStatus("idle");
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const dropped = e.dataTransfer.files?.[0];
    if (dropped) {
      setFile(dropped);
      setProgress(0);
      setStatus("idle");
    }
  };

  const preventDefault = (e: React.DragEvent) => e.preventDefault();

  const handleUpload = async () => {
    if (!file) return;
    setStatus("uploading");
    const formData = new FormData();
    formData.append("resume", file);
    try {
      const response = await axios.post(
        "http://localhost:5000/api/upload",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
          onUploadProgress: (evt) => {
            if (evt.total)
              setProgress(Math.round((evt.loaded / evt.total) * 100));
          },
        }
      );
      console.log(response);
      localStorage.setItem("resumeData", JSON.stringify(response.data));
      setStatus("done");
      // allow the user to enjoy the success animation briefly
      setTimeout(() => navigate("/summary"), 600);
    } catch (err) {
      console.error(err);
      setStatus("idle");
      alert("Failed to upload. Please try again.");
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        bgcolor: "#f5f7fa",
        p: 2,
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <Card
          sx={{
            width: 420,
            borderRadius: 4,
            boxShadow: 3,
            overflow: "hidden",
          }}
        >
          {/* Upload Area */}
          <Box
            onDrop={handleDrop}
            onDragOver={preventDefault}
            onClick={handleSelectFile}
            sx={{
              bgcolor: "primary.light",
              color: "primary.contrastText",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              height: 180,
              cursor: "pointer",
              position: "relative",
            }}
          >
            <input
              ref={inputRef}
              type="file"
              accept=".pdf"
              hidden
              onChange={handleFileChange}
            />
            {status === "done" ? (
              <CheckCircleRoundedIcon sx={{ fontSize: 60 }} />
            ) : (
              <CloudUploadRoundedIcon sx={{ fontSize: 60 }} />
            )}
            <Typography mt={1} variant="h6" textAlign="center">
              {file ? file.name : "Drag & Drop or Click to Select PDF"}
            </Typography>
          </Box>

          <CardContent>
            {status === "uploading" && (
              <Box mb={2}>
                <LinearProgress variant="determinate" value={progress} />
                <Typography variant="body2" mt={1} textAlign="center">
                  Uploading… {progress}%
                </Typography>
              </Box>
            )}

            <Stack direction="row" spacing={2} justifyContent="center">
              <Button
                variant="outlined"
                color="primary"
                disabled={status === "uploading"}
                onClick={handleSelectFile}
                startIcon={<UploadFileRoundedIcon />}
              >
                Choose File
              </Button>
              <Button
                variant="contained"
                color="primary"
                disabled={!file || status === "uploading"}
                onClick={handleUpload}
              >
                {status === "uploading" ? "Uploading…" : "Upload & Extract"}
              </Button>
            </Stack>
          </CardContent>
        </Card>
      </motion.div>
    </Box>
  );
};

// export default UploadResume;
