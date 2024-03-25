import * as React from "react";
import Paper from "@mui/material/Paper";
import Divider from "@mui/material/Divider";
import MenuList from "@mui/material/MenuList";
import MenuItem from "@mui/material/MenuItem";
import ListItemText from "@mui/material/ListItemText";

export default function DenseMenu({ active }) {
  return active ? (
    <Paper
      sx={{ width: "15rem", borderRadius: "20px" }}
      className="absolute top-14 right-10 z-0 drop-shadow-lg"
    >
      <MenuList dense>
        <MenuItem>
          <ListItemText>
            <strong>Registrate</strong>
          </ListItemText>
        </MenuItem>
        <MenuItem>
          <ListItemText>Iniciar Sesión</ListItemText>
        </MenuItem>

        <Divider />
        <MenuItem>
          <ListItemText>Favoritos</ListItemText>
        </MenuItem>
        <MenuItem>
          <ListItemText>Pon tu casa en Subrealista</ListItemText>
        </MenuItem>
        <MenuItem>
          <ListItemText>Cerrar Sesión</ListItemText>
        </MenuItem>
      </MenuList>
    </Paper>
  ) : null;
}
