import { Container, Grid, Pagination, Typography } from "@mui/material";
import { useCallback, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ReleaseCard, SearchInput } from "../../components";
import { useFetch } from "../../hooks/useFetch";
import { getQueryResults } from "../../services/discogsService";
import styles from "./Search.module.scss";

export const SearchPage = () => {
  const { query } = useParams();
  const navigate = useNavigate();
  const [page, setPage] = useState(1);

  const inputName = "search";

  const handleSubmit = (e: any) => {
    e.preventDefault();
    const { value } = e.target[inputName];
    setPage(1);
    navigate("/search/" + value);
  };

  const handleFetch = useCallback(
    () => getQueryResults({ q: query || "", page }),
    [query, page]
  );

  const handlePagination = (_e: any, value: number) => {
    setPage(value);
  };

  const [data, error, loading] = useFetch(handleFetch);

  if (loading) {
    return <Typography variant="h2" component="h2" align="center">Loading...</Typography>
  }

  const { results, pagination } = data!;

  return (
    <main>
      <Container
        component="section"
        maxWidth="xs"
        className={styles.navContainer}
      >
        <SearchInput onSubmit={handleSubmit} name={inputName} />
      </Container>
      <Container component="section" maxWidth="lg">
        <Grid container spacing={2} alignItems="stretch">
          {results.map((release) => (
            <Grid item xs={6} sm={4} md={3} key={release.id}>
              <ReleaseCard release={release} />
            </Grid>
          ))}
          {!results.length && (
            <Typography component="h2" variant="h3" align="center">
              No results available
            </Typography>
          )}
        </Grid>
      </Container>
      <Container maxWidth="sm" className={styles.paginationContainer}>
        <Pagination
          count={pagination.pages}
          page={page}
          onChange={handlePagination}
          siblingCount={1}
          className={styles.pagination}
        />
      </Container>
    </main>
  );
};
