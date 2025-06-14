// import React from 'react';
// import {
//   Box,
//   Typography,
//   Slider,
//   TextField,
//   Button,
//   Select,
//   MenuItem,
//   FormControl,
//   InputLabel,
// } from '@mui/material';

// const ManualOptimizationOptions = () => {
//   return (
//     <Box sx={{ p: 2, ml: 4, maxWidth: 400 }}>
//       <Typography variant="h6" gutterBottom>
//         Manual Optimization Options
//       </Typography>

//       {/* <FormControl fullWidth margin="normal">
//         <InputLabel>Font</InputLabel>
//         <Select defaultValue="'Inter', sans-serif" label="Font">
//           <MenuItem value="'Inter', sans-serif">Inter</MenuItem>
//           <MenuItem value="'Roboto', sans-serif">Roboto</MenuItem>
//           <MenuItem value="'Georgia', serif">Georgia</MenuItem>
//           <MenuItem value="'Courier Prime', monospace">Courier Prime</MenuItem>
//         </Select>
//       </FormControl> */}

//       <Typography gutterBottom>Font Size</Typography>
//       <Slider defaultValue={14} min={8} max={24} />

//       <Typography gutterBottom>Line Spacing</Typography>
//       <Slider defaultValue={1.5} min={1} max={3} step={0.1} />

//       <Typography gutterBottom>Paragraph Gap (px)</Typography>
//       <Slider defaultValue={16} min={0} max={48} />

//       <FormControl fullWidth margin="normal">
//         <InputLabel>Text Alignment</InputLabel>
//         <Select defaultValue="left" label="Text Alignment">
//           <MenuItem value="left">Left</MenuItem>
//           <MenuItem value="center">Center</MenuItem>
//           <MenuItem value="right">Right</MenuItem>
//           <MenuItem value="justify">Justify</MenuItem>
//         </Select>
//       </FormControl>

//       <Typography gutterBottom>Top Margin (px)</Typography>
//       <Slider defaultValue={40} min={0} max={100} />

//       <Typography gutterBottom>Right Margin (px)</Typography>
//       <Slider defaultValue={40} min={0} max={100} />

//       <Typography gutterBottom>Bottom Margin (px)</Typography>
//       <Slider defaultValue={40} min={0} max={100} />

//       <Typography gutterBottom>Left Margin (px)</Typography>
//       <Slider defaultValue={40} min={0} max={100} />

//       <Box mt={3}>
//         <Typography variant="subtitle1">Find and Replace</Typography>
//         <TextField fullWidth margin="dense" placeholder="Find..." />
//         <TextField fullWidth margin="dense" placeholder="Replace with..." />
//         <Button variant="contained" sx={{ mt: 1 }}>Replace</Button>
//       </Box>
//     </Box>
//   );
// };

// export default ManualOptimizationOptions;

import React from 'react';
import {
  Box,
  Typography,
  Slider,
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from '@mui/material';

type CustomStyles = {
  fontSize: number;
  lineSpacing: number;
  paragraphGap: number;
  textAlign: string;
  topMargin: number;
  rightMargin: number;
  bottomMargin: number;
  leftMargin: number;
};

type Props = {
  customStyles: CustomStyles;
  setCustomStyles: React.Dispatch<React.SetStateAction<CustomStyles>>;
  handleCustomize: () => void;
};

const ManualOptimizationOptions: React.FC<Props> = ({
  customStyles,
  setCustomStyles,
  handleCustomize,
}) => {
  const handleChange = (key: keyof CustomStyles) => (event: Event, value: number | number[]) => {
    const newValue = typeof value === 'number' ? value : value[0];
    setCustomStyles((prev) => ({ ...prev, [key]: newValue }));
  };

  return (
    <Box sx={{ p: 2, ml: 4, maxWidth: 400 }}>
      <Typography variant="h6" gutterBottom>
        Manual Optimization Options
      </Typography>

      <Typography gutterBottom>Font Size</Typography>
      <Slider value={customStyles.fontSize} min={8} max={24} onChange={handleChange('fontSize')} />

      <Typography gutterBottom>Line Spacing</Typography>
      <Slider value={customStyles.lineSpacing} min={1} max={3} step={0.1} onChange={handleChange('lineSpacing')} />

      <Typography gutterBottom>Paragraph Gap</Typography>
      <Slider value={customStyles.paragraphGap} min={0} max={48} onChange={handleChange('paragraphGap')} />

      <FormControl fullWidth margin="normal">
        <InputLabel>Text Alignment</InputLabel>
        <Select
          value={customStyles.textAlign}
          onChange={(e) => setCustomStyles((prev) => ({ ...prev, textAlign: e.target.value }))}
        >
          <MenuItem value="left">Left</MenuItem>
          <MenuItem value="center">Center</MenuItem>
          <MenuItem value="right">Right</MenuItem>
          <MenuItem value="justify">Justify</MenuItem>
        </Select>
      </FormControl>

      {(['topMargin', 'rightMargin', 'bottomMargin', 'leftMargin'] as const).map((key) => (
        <Box key={key}>
          <Typography gutterBottom>{`${key.replace(/([A-Z])/g, ' $1')}`}</Typography>
          <Slider value={customStyles[key]} min={0} max={100} onChange={handleChange(key)} />
        </Box>
      ))}

      <Button variant="contained" sx={{ mt: 2 }} onClick={handleCustomize}>
        Apply Customization
      </Button>
    </Box>
  );
};

export default ManualOptimizationOptions;
