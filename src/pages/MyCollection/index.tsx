import { Container, Grid, Pagination, Typography } from "@mui/material"
import { useCallback, useState } from "react"
import { ReleaseCard } from "../../components"
import { useFetch } from "../../hooks/useFetch"
import { getFolderReleases } from "../../services/discogsService"
import styles from './MyCollection.module.scss'

export const MyCollectionPage = () => {
  const [page, setPage] = useState(1)
  
  const handleFetch = useCallback(() => getFolderReleases(page), [page])
  const [data, error, loading] = useFetch(handleFetch)

  const handlePagination = (_e: any, value: number) => {
    setPage(value);
  };
  
  if (loading) {
    return <Typography variant="h2" component="h2" align="center">Loading...</Typography>
  }

  const { releases, pagination } = data!

  return (
    <main>
      <Container component="section" maxWidth="lg">
        <Grid container spacing={2} alignItems="stretch">
          {releases.map((release) => (
            <Grid item xs={6} sm={4} md={3} key={release.basic_information.id}>
              <ReleaseCard release={release.basic_information} />
            </Grid>
          ))}
          {!releases.length && (
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
  )
}