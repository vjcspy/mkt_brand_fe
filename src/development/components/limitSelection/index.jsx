import React from "react";
import styled from "styled-components";

const Select = styled.select`
  padding-top: 0;
  padding-left: 5px;
  padding-right: 30px;
  background-position: right -1px center;
  background-repeat: no-repeat;
  background-image: url(data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjMiIGhlaWdodD0iMzIiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGcgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJldmVub2RkIj48cGF0aCBkPSJNLjAxOCAwaDIwYTIgMiAwIDAxMiAydjI4YTIgMiAwIDAxLTIgMmgtMjBWMHoiIGZpbGw9IiNGQUZBRkIiLz48cGF0aCBkPSJNMTQuMDE4IDE4LjM3NWEuMzYuMzYgMCAwMS0uMTEyLjI2NGwtMi42MjUgMi42MjVhLjM2LjM2IDAgMDEtLjI2My4xMTEuMzYuMzYgMCAwMS0uMjY0LS4xMTFsLTIuNjI1LTIuNjI1YS4zNi4zNiAwIDAxLS4xMTEtLjI2NC4zNi4zNiAwIDAxLjExMS0uMjY0LjM2LjM2IDAgMDEuMjY0LS4xMTFoNS4yNWEuMzYuMzYgMCAwMS4yNjMuMTExLjM2LjM2IDAgMDEuMTEyLjI2NHptLTYtMy4zNzVhLjM2LjM2IDAgMDEuMTExLS4yNjRsMi42MjUtMi42MjVhLjM2LjM2IDAgMDEuMjY0LS4xMTEuMzYuMzYgMCAwMS4yNjMuMTExbDIuNjI1IDIuNjI1YS4zNi4zNiAwIDAxLjExMi4yNjQuMzYuMzYgMCAwMS0uMTEyLjI2NC4zNi4zNiAwIDAxLS4yNjMuMTExaC01LjI1YS4zNi4zNiAwIDAxLS4yNjQtLjExMS4zNi4zNiAwIDAxLS4xMTEtLjI2NHoiIGZpbGwtcnVsZT0ibm9uemVybyIgZmlsbD0iI0IzQjVCOSIvPjwvZz48L3N2Zz4=);
  border: 1px solid ${({ theme }) => theme.devColor.border};
  border-radius: 4px;
  appearance: none;
  width: 75px !important;
`;

const LimitSelection = ({ limit, onChange }) => {
  return (
    <Select
      name="_limit"
      onChange={(e) => {
        onChange(parseInt(e.target.value, 10));
      }}
      value={limit ?? 10}
    >
      {[10, 20, 50, 100].map((value) => (
        <option value={value} key={value}>
          {value}
        </option>
      ))}
    </Select>
  );
};

export default LimitSelection;
