import { Search } from "@mui/icons-material";
import { IconButton, InputBase, Paper } from "@mui/material"

type SearchInputProps = {
  placeholder?: string;
  onSubmit: any;
  name: string;
}
export const SearchInput = ({ placeholder = "Search...", onSubmit: handleSubmit, name }: SearchInputProps) => {
  return (
    <Paper component="form" onSubmit={handleSubmit} sx={{ display: 'flex', paddingLeft: 2, width: '92%' }}>
      <InputBase placeholder={placeholder} name={name} sx={{ flex: 1 }} />
      <IconButton type="submit" >
        <Search />
      </IconButton>
    </Paper>
  )
}