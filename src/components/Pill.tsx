import { Box, SxProps, Theme, Tooltip } from "@mui/material";
import { grey } from "@mui/material/colors";
import React from "react";

interface Props {
  content: string;
  pillPisition?: "top-left" | "bottom-left";
}

function CardPill({ content, pillPisition = "bottom-left" }: Props) {
  let sx;

  switch (pillPisition) {
    case "bottom-left":
      sx = {
        transform: "translateY(50%)",
        bottom: "0px",
        left: "2rem",
      };
      break;
    case "top-left":
      sx = {
        transform: "translateY(-50%)",
        top: "0px",
        left: "2rem",
      };
      break;
    default:
      break;
  }

  return (
    <Tooltip title="News Site" placement="right" arrow>
      <Box
        // nasty hardcoded positioning TO FIX
        sx={{
          color: "text.primary",
          position: "absolute",
          backgroundColor: grey[800],
          p: "0.5rem",
          pl: "1rem",
          pr: "1rem",
          borderRadius: "1rem",
          userSelect: "none",
          ...sx,
        }}
      >
        {content}
      </Box>
    </Tooltip>
  );
}

export default CardPill;
