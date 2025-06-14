import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  Chip,
  Box,
  Grid,
  TextField,
  InputAdornment,
  Button,
  Stack,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import axios from "axios";
import { useNavigate } from "react-router-dom";

interface ResumeData {
  Name: string;
  Email: string;
  Phone: string;
  Skills: string[];
  "Work Experience": string;
  pdfUrl: string; // URL served by backend, e.g. http://localhost:5000/uploads/<file>.pdf
}

/**
 * ResumeDashboard
 * ---------------
 * Displays *unique* uploaded resumes (w/ their PDF) and supports tag search.
 * "View PDF" opens the document; "View Summary" routes to `/summary`.
 */
export const ResumeDashboard: React.FC = () => {
  const [resumes, setResumes] = useState<ResumeData[]>([]);
  const [filtered, setFiltered] = useState<ResumeData[]>([]);
  const [tag, setTag]           = useState<string>("");
  const navigate                = useNavigate();

  /* ───────────── Fetch + deduplicate on mount ───────────── */
  useEffect(() => {
    const fetchResumes = async () => {
      try {
        const res = await axios.get<ResumeData[]>("http://localhost:5000/api/all");

        // Deduplicate by Email (fallback to Name+pdfUrl)
        const uniqueMap = new Map<string, ResumeData>();
        res.data.forEach((r) => {
          const key = (r.Email || `${r.Name}-${r.pdfUrl}`).toLowerCase();
          if (!uniqueMap.has(key)) uniqueMap.set(key, r);
        });
        console.log(uniqueMap)
        const unique = Array.from(uniqueMap.values());

        setResumes(unique);
        setFiltered(unique);
      } catch (err) {
        console.error(err);
      }
    };
    fetchResumes();
  }, []);

  /* ───────────── Filter resumes whenever tag changes ───────────── */
  useEffect(() => {
    if (!tag.trim()) {
      setFiltered(resumes);
    } else {
      const lc = tag.toLowerCase();
      setFiltered(
        resumes.filter((r) => r.Skills?.some((s) => s.toLowerCase().includes(lc)))
      );
    }
  }, [tag, resumes]);

  /* ───────────── Helpers ───────────── */
  const handleViewSummary = (resume: ResumeData) => {
    localStorage.setItem("resumeData", JSON.stringify(resume));
    navigate("/summary");
  };

  /* ──────────────────────────────────────────────── */
  return (
    <Box p={4}>

      {/* Search Field */}
      <TextField
        fullWidth
        variant="outlined"
        placeholder="Search by skill/tag..."
        value={tag}
        onChange={(e) => setTag(e.target.value)}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          ),
        }}
        sx={{ mb: 4 }}
      />

      {/* Resumes Grid */}
      <Grid container spacing={3}>
        {filtered.map((res, idx) => (
          <Grid item xs={12} md={6} key={idx}>
            <Card sx={{ boxShadow: 4, borderRadius: 3, height: "100%" }}>
              <CardContent>
                <Typography variant="h6" gutterBottom color="primary" sx={{ fontWeight: 600 }}>
                  {res.Name}
                </Typography>

                <Stack direction="row" alignItems="center" spacing={1} mb={1}>
                  <PictureAsPdfIcon color="error" />
                  <Button
                    href={res.pdfUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    size="small"
                    sx={{ textTransform: "none" }}
                  >
                    View PDF
                  </Button>
                </Stack>

                <Typography variant="body2" color="text.secondary">
                  <strong>Email:</strong> {res.Email}
                </Typography>
                <Typography variant="body2" color="text.secondary" gutterBottom>
                  <strong>Phone:</strong> {res.Phone}
                </Typography>

                <Box display="flex" flexWrap="wrap" gap={1} my={1}>
                  {res.Skills?.slice(0, 8).map((skill, i) => (
                    <Chip key={i} label={skill} color="secondary" variant="outlined" />
                  ))}
                </Box>

                {/* Experience snippet */}
                {/* <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                  {res["Work Experience"].slice(0, 120)}{res["Work Experience"].length > 120 && "…"}
                </Typography> */}

                <Box mt={2} display="flex" justifyContent="flex-end">
                  <Button size="small" variant="contained" onClick={() => handleViewSummary(res)}>
                    View Summary
                  </Button>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}

        {/* Empty state */}
        {filtered.length === 0 && (
          <Grid item xs={12}>
            <Typography variant="body1" color="text.secondary" textAlign="center">
              {tag ? `No resumes match "${tag}".` : "No resumes found."}
            </Typography>
          </Grid>
        )}
      </Grid>
    </Box>
  );
};

//export default ResumeDashboard;
