"use client";
import * as React from "react";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import {
  Dialog,
  DialogContent,
  DialogContentText,
  DialogActions,
  Stack,
  Link,
} from "@mui/material";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};

export default function ViewReport({ data, open, onClose }: any) {
  const handleClose = () => onClose();

  const getDate = (timestamp: string) => {
    const originalDate: any = new Date(timestamp);
    const currentDate: any = new Date();

    const timeDifference = currentDate - originalDate;
    const daysAgo = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
    const date = originalDate.toLocaleString("en-US", {
      day: "numeric",
      month: "numeric",
      year: "2-digit",
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    });

    const formattedDate =
      daysAgo > 0
        ? `${date} (${daysAgo} day${daysAgo > 1 ? "s" : ""} ago)`
        : date;

    return formattedDate;
  };

  const getRoomType = (type: any) => {
    switch (type) {
      case "bathroom":
        return "Bath Room";
      case "bedroom":
        return "Bed Room";
      default:
        return "Others";
    }
  };
  return (
    <div>
      <Dialog open={open} onClose={handleClose}>
        <DialogContent>
          <DialogContentText>
            <Stack gap={2}>
              <Typography> Flat Nubmer: {data.flat_number}</Typography>
              <Typography> Room Type: {getRoomType(data.room_type)}</Typography>
              <Typography> Description: {data.description}</Typography>
              <Typography> Report Date: {getDate(data.timestamp)}</Typography>
              <Typography>Report Id: {data.report_id}</Typography>

              <Stack direction={"row"} gap={1}>
                <Typography>Media: </Typography>
                <Stack direction={"row"} gap={2}>
                  {data.media_urls &&
                    data.media_urls.length > 0 &&
                    data.media_urls.map((url: string, index: number) => (
                      <Link
                        href={url}
                        underline="none"
                        target="_blank"
                        rel="noopener"
                      >
                        Image {index + 1}
                      </Link>
                    ))}
                </Stack>
              </Stack>
            </Stack>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
