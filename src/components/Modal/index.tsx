import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  List,
  ListItem,
  ListItemText,
  Typography,
  Grid
} from "@mui/material";
import { useCallback } from "react";
import { useFetch } from "../../hooks/useFetch";
import { getReleaseInfo } from "../../services/discogsService";
import styles from './Modal.module.scss'

type ModalProps = {
  open: boolean;
  handleClose: () => void;
  releaseId: number;
};

export const Modal = ({ open, handleClose, releaseId }: ModalProps) => {
  const handleFetch = useCallback(() => getReleaseInfo(releaseId), [releaseId]);
  const [data, error, loading] = useFetch(handleFetch);

  if (loading) {
    return (
      <Dialog open={open} fullWidth={true} maxWidth="md">
        <DialogContent>
          <DialogTitle>
            Loading...
          </DialogTitle>
        </DialogContent>
      </Dialog>
    );
  }

  const { title, year, images, tracklist, styles: releaseStyles, artists } = data!;

  return (
    <Dialog fullWidth={true} maxWidth="md" open={open} onClose={handleClose}>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
          <img width="100%" src={images[0].resource_url} alt="" className={styles.image} />
        </Box>
        <Grid container sx={{ my: 2 }}>
          <Grid item xs={12} lg={6}>
            <Box sx={{ mb: 2 }}>
              <Typography component="h4">
                <b>Year:</b> {year}
              </Typography>
            </Box>
            <Box>
              <Typography component="h4">
                <b>Artists:</b>
              </Typography>
              <List>
                {artists.map(artist => (
                  <ListItem>
                    <ListItemText key={artist.id}>{artist.name}</ListItemText>
                  </ListItem>
                ))}
              </List>       
            </Box>
            <Box>
              <Typography component="h4">
                <b>Styles:</b>
              </Typography>
              <List>
                {releaseStyles.map(style => (
                  <ListItem>
                    <ListItemText key={style}>{style}</ListItemText>
                  </ListItem>
                ))}
              </List>       
            </Box>
          </Grid>
          <Grid item xs={12} lg={6}>
            <Box>
              <Typography component="h4">
                <b>Tracklist:</b>
              </Typography>
              <List>
              {tracklist.map(track => (
                <ListItem>
                  <ListItemText key={track.position}>{track.title}</ListItemText>
                </ListItem>
              ))}
              </List>       
            </Box>
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Close</Button>
      </DialogActions>
    </Dialog>
  );
};
