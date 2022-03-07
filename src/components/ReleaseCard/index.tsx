import { Favorite } from "@mui/icons-material";
import { Button, Card, CardActions, CardContent, CardMedia, IconButton, Typography } from "@mui/material";
import { useContext } from "react";
import Swal from "sweetalert2";
import { ModalContext } from "../../contexts/ModalContext";
import { addToFolder } from "../../services/discogsService";
import { DiscogRelease } from "../../types";

type ArtistCardProps = {
  release: DiscogRelease
}

export const ReleaseCard = ({ release }: ArtistCardProps) => {
  const { handleOpen } = useContext(ModalContext)

  const { thumb, id, title, year } = release

  const handleClick = () => {
    if (handleOpen) handleOpen(id)
  }

  const handleFav = async () => {
    const response = await addToFolder(id)
    Swal.fire({
      title: 'Thank you!',
      text: 'We have added this release you your favored list!',
      icon: 'success'
    })
  }

  return (
    <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <CardMedia
        component="img"
        height="280"
        image={thumb || 'https://via.placeholder.com/280'}
        alt="Bike"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {title}
        </Typography>
        <Typography component="p">
          {year}
        </Typography>
      </CardContent>
      <CardActions sx={{ mt: 'auto'}}>
        <Button size="small" onClick={handleClick}>View more</Button>
        <IconButton onClick={handleFav}>
          <Favorite color="error"/>
        </IconButton>
      </CardActions>
    </Card>
  )
}
