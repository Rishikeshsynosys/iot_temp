import * as React from "react";
import { Pagination as MUIPagination } from "@mui/material";
import PaginationItem from "@mui/material/PaginationItem";
import Stack from "@mui/material/Stack";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

export default function Pagination({ onPageChange }) {
  const [page, setPage] = React.useState(1);

  const handleChange = (event, value) => {
    setPage(value);
    if (onPageChange) {
      onPageChange(value);
    }
  };

  return (
    <div className="flex justify-center mt-3">
      <Stack spacing={2}>
        <MUIPagination
          count={10}
          page={page}
          onChange={handleChange}
          renderItem={(item) => (
            <PaginationItem
              slots={{ previous: ArrowBackIcon, next: ArrowForwardIcon }}
              {...item}
            />
          )}
        />
      </Stack>
    </div>
  );
}
