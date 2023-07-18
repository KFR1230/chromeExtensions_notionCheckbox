import { Autocomplete, TextField } from '@mui/material';

export default function ComboBox(pages) {
  const pageOpt = [];

  (function () {
    pages.pages.map((page) => {
      pageOpt.push({
        label: page.id,
      });
    });
    // console.log(pageOpt);
  })();

  return (
    <Autocomplete
      disablePortal
      id="combo-box"
      options={pageOpt}
      sx={{ m: 1.5, width: 100 }}
      size="small"
      renderInput={(params) => <TextField {...params} label="Page" />}
    />
  );
}
