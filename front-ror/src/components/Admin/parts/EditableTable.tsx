import { DataGridPremium, useGridApiRef } from "@mui/x-data-grid-premium";
import React, { useCallback, useEffect, useState } from "react";

import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import { Box, Button } from "@mui/material";
import axios from "axios";

const getObjectDifferences = (updatedRow, rows) => {
  console.warn(`\n🚀 > rows:`, JSON.stringify(rows, null, 2));
  console.warn(`\n🚀 > updatedRow:`, JSON.stringify(updatedRow, null, 2));
  const diff = {};
  const isNumeric = (val) => !isNaN(parseFloat(val)) && isFinite(val);
  const originalRow = rows.find((row) => row.id === updatedRow.id);

  if (!originalRow) {
    return { error: "Matching object not found in rows" };
  }

  for (let [key, value1] of Object.entries(updatedRow)) {
    if (key === "character") {
      continue;
    }
    if (originalRow.hasOwnProperty(key)) {
      const value2 = originalRow[key];
      const numValue1 = isNumeric(value1) ? parseFloat(value1) : value1;
      const numValue2 = isNumeric(value2) ? parseFloat(value2) : value2;

      if (typeof numValue1 === "string" || typeof numValue2 === "string") {
        continue;
      }

      if (numValue1 !== numValue2) {
        diff[key] = numValue1 - numValue2;
      }
    } else {
      if (isNumeric(value1)) {
        diff[key] = parseFloat(value1);
      }
    }
  }

  for (let [key, value2] of Object.entries(originalRow)) {
    if (!updatedRow.hasOwnProperty(key) && isNumeric(value2)) {
      diff[key] = parseFloat(value2);
    }
  }

  return diff;
};
const isObject = (variable) => {
  return (
    variable !== null &&
    typeof variable === "object" &&
    !Array.isArray(variable)
  );
};

const EditableTable = ({ endpoint, primaryKey, editableColumns }) => {
  const apiRef = useGridApiRef();
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [changes, setChanges] = useState({});
  const columns = editableColumns.map((col) => ({
    field: col,
    headerName: col.charAt(0).toUpperCase() + col.slice(1),
    editable: true,
  }));
  const useFakeMutation = (rows) => {
    return useCallback(
      (cell) =>
        new Promise((resolve, reject) => {
          setTimeout(() => {
            if (!cell) {
              reject("No cell");
            } else if (!rows) {
              reject("No rows");
            }

            let diff = getObjectDifferences(cell, rows);
            if (isObject(diff)) {
              setChanges({ ...changes, ...diff });
              resolve(diff);
            } else {
              reject(diff);
            }
          }, 100);
        }),
      [],
    );
  };
  let mutateRow = useFakeMutation(rows);
  useEffect(() => {
    // console.warn("changes : ", JSON.stringify(changes));
    // console.warn("changes : ", changes);
  }, [rows]);
  const [snackbar, setSnackbar] = useState(null);

  const handleCloseSnackbar = () => setSnackbar(null);

  const processRowUpdate = useCallback(
    async (newRow) => {
      const response = await mutateRow(newRow);
      if (response) {
        console.warn(`\n🚀 > response:`, response);

        const updatedRow = { ...newRow, ...response };
        setSnackbar({ children: "Successfully saved", severity: "success" });
        return updatedRow;
      }
    },
    [mutateRow],
  );

  const handleProcessRowUpdateError = useCallback((error) => {
    setSnackbar({ children: error.message, severity: "error" });
  }, []);

  useEffect(() => {
    axios
      .request({
        method: "GET",
        url: `http://localhost:3009/${endpoint}`,
      })
      .then(function (response) {
        let json = response.data;

        let rows = json.map((row, index) => {
          row.id = index;
          return row;
        });
        console.warn(`\n🚀 > rows :`, rows);

        setRows(rows);
        setLoading(false);
      })
      .catch((error) => {
        console.warn("Error fetching data:", error);
      });
  }, [endpoint, primaryKey, loading]);

  const handleSubmitChanges = () => {
    fetch(`http://localhost:3009/${endpoint}/${primaryKey}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        [primaryKey]: changes,
      }),
    });
  };
  const [outliersFactor, setOutliersFactor] = React.useState(String("1.5"));
  const autosizeOptions = {
    includeHeaders: true,
    includeOutliers: true,
    outliersFactor: Number.isNaN(parseFloat(outliersFactor))
      ? 1
      : parseFloat(outliersFactor),
    expand: true,
  };

  return (
    <Box
      // minHeight="100vh"
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center", // height: "50vh",
        alignItems: "flex-start",
        borderRadius: 1,
        m: 1,
        p: 1,
      }}
      style={{ width: "100%" }}
    >
      <DataGridPremium
        rows={rows}
        columns={columns}
        apiRef={apiRef}
        density="compact"
        getDetailPanelHeight={() => "auto"}
        processRowUpdate={processRowUpdate}
        onProcessRowUpdateError={handleProcessRowUpdateError}
        autoHeight
        autosizeOnMount
        autosizeOptions={autosizeOptions}
        // loading={loading}
        // disableRowSelectionOnClick
        // slots={{ toolbar: GridToolbar }}
        style={{
          borderRadius: ".8em",
        }}
      />
      {!!snackbar && (
        <Snackbar
          open
          anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
          onClose={handleCloseSnackbar}
          autoHideDuration={6000}
        >
          <Alert {...snackbar} onClose={handleCloseSnackbar} />
        </Snackbar>
      )}
      <Button
        sx={{ marginTop: 2, backgroundColor: "#577581", color: "#000" }}
        variant="contained"
        onClick={handleSubmitChanges}
      >
        Sauvegarder
      </Button>
    </Box>
  );
};

export default EditableTable;
