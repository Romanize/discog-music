import { Container, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { SearchInput } from "../../components";
import colors from "../../styles/colors.module.scss";
import styles from "./Home.module.scss";

export const HomePage = () => {
  const navigate = useNavigate();
  const inputName = "search";

  const handleSubmit = (e: any) => {
    e.preventDefault();
    const { value } = e.target[inputName];
    navigate("/search/" + value);
  };

  return (
    <main className={styles.main}>
      <Container
        component="section"
        maxWidth="sm"
        className={styles.container}
      >
        <Typography component="h1" variant="h2" color={colors.white} align="center" fontWeight="bold">
          BRIDGE FOR MUSIC
        </Typography>
        <Typography component="h2" variant="h5" color={colors.white} align="center" sx={{ mb: 2 }}>
          Search for your favorite artists and save a list for later
        </Typography>
        <SearchInput onSubmit={handleSubmit} name={inputName} />
      </Container>
    </main>
  );
};
