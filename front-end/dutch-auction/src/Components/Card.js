import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

export default function OutlinedCard({ props }) {
  console.log(props);
  return (
    <Box sx={{ minWidth: 300, maxWidth: 300 }}>
      <Card
        variant="outlined"
        style={{ height: 270, display: "flex", flexDirection: "column" }}
      >
        <CardContent>
          <Typography variant="h5" component="div">
            {props.title}
          </Typography>
          <Typography variant="body2">
            <br />
            {props.body}
          </Typography>
        </CardContent>
        <Box style={{ flexGrow: 2 }}></Box>
        <CardActions>
          <Button size="small" href={props.link}>
            Learn More
          </Button>
        </CardActions>
      </Card>
    </Box>
  );
}
