"use client";
import { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import {
  Dialog,
  DialogContent,
  DialogContentText,
  DialogActions,
  Stack,
  MenuItem,
  TextField,
} from "@mui/material";

export default function AddNewReport({ open, onClose, onAddNewReport }: any) {
  const [flatNumber, setFlatNumber] = useState<any>(null);
  const [roomType, setRoomType] = useState<any>("bathroom");
  const [description, setDescription] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [files, setFiles] = useState([]);

  const add = async () => {
    setLoading(true);
    await onAddNewReport({
      flatNumber,
      roomType,
      description,
    });
    setLoading(false);
  };

  const roomTypes = [
    { label: "Bathroom", value: "bathroom" },
    { label: "Room", value: "room" },
    { label: "Kitchen", value: "kitchen" },
    { label: "Others", value: "others" },
  ];

  const handleClose = () => onClose();

  return (
    <div>
      <Dialog open={open} onClose={handleClose}>
        <DialogContent>
          <DialogContentText>
            <Stack gap={2}>
              <TextField
                select
                label="Room Type"
                defaultValue={roomType}
                sx={{
                  minWidth: 500,
                }}
                onChange={(e) => setRoomType(e.target.value)}
              >
                {roomTypes.map((room) => (
                  <MenuItem value={room.value}>{room.label}</MenuItem>
                ))}
              </TextField>

              <TextField
                label="Flat Number"
                variant="outlined"
                onChange={(e) => setFlatNumber(e.target.value)}
              />

              <TextField
                label="Description"
                multiline
                maxRows={4}
                rows={3}
                onChange={(e) => setDescription(e.target.value)}
              />
              {/* <TextField type="file" /> */}
            </Stack>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Stack
            sx={{
              width: "100%",
              paddingX: "1rem",
            }}
            direction={"row"}
            justifyContent={"space-between"}
          >
            <Button onClick={handleClose}>Close</Button>
            <Button disabled={loading} variant="contained" onClick={add}>
              Add
            </Button>
          </Stack>
        </DialogActions>
      </Dialog>
    </div>
  );
}
