// import React from "react";

// export const ResumeSummary = () => {
//   const resumeData = JSON.parse(localStorage.getItem("resumeData") || "{}");
//   const { name, email, phone, skills, workExperience } = resumeData;

//   return (
//     <div className="bg-white p-6 rounded shadow-md space-y-4">
//       <h2 className="text-xl font-bold">Summary</h2>
//       <p><strong>Name:</strong> {name}</p>
//       <p><strong>Email:</strong> {email}</p>
//       <p><strong>Phone:</strong> {phone}</p>
//       <p><strong>Skills:</strong> {skills?.join(", ")}</p>
//       <div>
//         <strong>Experience:</strong>
//         <pre className="whitespace-pre-wrap bg-gray-100 p-2 rounded">
//           {workExperience}
//         </pre>
//       </div>
//     </div>
//   );
// };


import React from "react";
import { Card, CardContent, Typography, Chip, Box, Grid, Paper } from "@mui/material";

export const ResumeSummary = () => {
  const resumeData = JSON.parse(localStorage.getItem("resumeData") || "{}");
  console.log(resumeData);
  const name=resumeData.Name
  const email=resumeData.Email
  const phone=resumeData.Phone
  const skills=resumeData.Skills
  const workExperience=resumeData["Work Experience"]
  //const { name, email, phone, skills, workExperience } = resumeData
  return (
    <Box display="flex" justifyContent="center" mt={4}>
      <Card sx={{ maxWidth: 800, width: "100%", boxShadow: 6, borderRadius: 4 }}>
        <CardContent>
          <Typography variant="h4" gutterBottom sx={{ fontWeight: 600, color: "#1976d2" }}>
            Resume Summary
          </Typography>

          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <Typography variant="subtitle1" color="text.secondary">
                <strong>Name:</strong> {name || "N/A"}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="subtitle1" color="text.secondary">
                <strong>Email:</strong> {email || "N/A"}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="subtitle1" color="text.secondary">
                <strong>Phone:</strong> {phone || "N/A"}
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="subtitle1" gutterBottom color="text.secondary">
                <strong>Skills:</strong>
              </Typography>
              <Box display="flex" flexWrap="wrap" gap={1}>
                {skills?.map((skill: string, index: number) => (
                  <Chip key={index} label={skill} color="primary" variant="outlined" />
                )) || "No skills found"}
              </Box>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="subtitle1" gutterBottom color="text.secondary">
                <strong>Work Experience:</strong>
              </Typography>
              <Paper elevation={2} sx={{ p: 2, bgcolor: "#f9f9f9", whiteSpace: "pre-wrap", borderRadius: 2 }}>
                {workExperience || "No work experience provided."}
              </Paper>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Box>
  );
};

