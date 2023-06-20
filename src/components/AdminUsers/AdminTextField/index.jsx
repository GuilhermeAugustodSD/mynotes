import { IconButton, InputAdornment, TextField } from "@mui/material";

export default function IconTextField ({ iconStart, iconEnd, ...props }) {
    return (
      <TextField
        {...props}
        InputProps={{
          endAdornment: iconEnd ? (
            <InputAdornment position="end">
                <IconButton>{iconEnd}</IconButton>
            </InputAdornment>
          ) : null
        }}
      />
    );
  };
