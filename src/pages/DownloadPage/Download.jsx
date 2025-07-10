import React, { useEffect, useState, useMemo } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Button, Box, CircularProgress, IconButton, Tooltip, TextField, Typography } from "@mui/material";
import { FiDownload, FiInfo } from "react-icons/fi";
import useUserStore from "../../Zustand_State/UserStore";
import useAuthStore from "../../Zustand_State/AuthStore";
import InfoTooltip from "../../components/Tooltipinfo/InfoTooltip";
import "./Download.css"; // <-- Import your CSS

const Download = () => {
  const { downloads, downloadsLoading, fetchDownloads, getAndDownloadFile } = useUserStore();
  const { authUser } = useAuthStore();
  const [downloadingId, setDownloadingId] = useState(null);
  const [pageSize, setPageSize] = useState(5);
  const [searchText, setSearchText] = useState("");
  const [page, setPage] = useState(0);

  // const downloadsLoading = false;
  // const downloads = [
  //   {
  //     file_id: "001",
  //     language: "JavaScript",
  //     created_at: "2025-07-08 14:32",
  //     filename: "main-app.js",
  //     file_size: "45 KB",
  //     code_lines: 320,
  //     total_credit_used: 8.5,
  //     url: "https://example.com/download/001",
  //     sub_file_details: [
  //       { name: "utils.js", size: "12 KB" },
  //       { name: "constants.js", size: "5 KB" }
  //     ]
  //   },
  //   {
  //     file_id: "002",
  //     language: "Python",
  //     created_at: "2025-07-07 09:12",
  //     filename: "predictor.py",
  //     file_size: "89 KB",
  //     code_lines: 580,
  //     total_credit_used: 13.2,
  //     url: "https://example.com/download/002",
  //     sub_file_details: []
  //   },
  //   {
  //     file_id: "003",
  //     language: "SQL",
  //     created_at: "2025-07-06 18:45",
  //     filename: "query.sql",
  //     file_size: "12 KB",
  //     code_lines: 75,
  //     total_credit_used: null,
  //     url: "",
  //     sub_file_details: []
  //   },
  //   {
  //     file_id: "004",
  //     language: "Java",
  //     created_at: "2025-07-05 11:10",
  //     filename: "LoginService.java",
  //     file_size: "67 KB",
  //     code_lines: 410,
  //     total_credit_used: 9.7,
  //     url: "https://example.com/download/004",
  //     sub_file_details: [
  //       { name: "AuthHelper.java", size: "22 KB" }
  //     ]
  //   },
  //   {
  //     file_id: "005",
  //     language: "C++",
  //     created_at: "2025-07-04 16:27",
  //     filename: "engine.cpp",
  //     file_size: "130 KB",
  //     code_lines: 900,
  //     total_credit_used: 17.6,
  //     url: "https://example.com/download/005",
  //     sub_file_details: []
  //   }
  // ];

  useEffect(() => {
    if (authUser) {
      fetchDownloads();
    }
  }, [authUser, fetchDownloads]);

  const handleDownload = async (filename, fileId) => {
    setDownloadingId(fileId);
    await getAndDownloadFile(filename, fileId);
    setTimeout(() => setDownloadingId(null), 1000);
  };

  const columns = useMemo(() => [
    {
      field: "index",
      headerName: "Index",
      width: 80,
      sortable: false,
    },
    { field: "language", headerName: "Language", flex: 1, sortable: true },
    { field: "created_at", headerName: "Date & Time", flex: 1.5, sortable: true },
    {
      field: "filename",
      headerName: "File Name",
      flex: 2,
      sortable: true,
      renderCell: (params) => (
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <span className="filename-cell">{params.value}</span>
          {params.row.sub_file_details?.length > 0 && (
            <Tooltip
              title={<InfoTooltip fileName={params.value} details={params.row.sub_file_details} />}
              placement="top"
              arrow
              componentsProps={{
                tooltip: {
                  sx: {
                    bgcolor: "#fff",
                    color: "#000",
                    border: "1px solid #e3e7fd",
                    boxShadow: 3,
                    p: 1,
                    minWidth: 200,
                    maxWidth: 320,
                    whiteSpace: "normal",
                    fontSize: "0.65rem",
                  }
                }
              }}
            >
              <IconButton size="small">
                <FiInfo />
              </IconButton>
            </Tooltip>
          )}
        </Box>
      ),
    },
    { field: "file_size", headerName: "File Size", flex: 1, sortable: true },
    { field: "code_lines", headerName: "Lines of Code", flex: 1, sortable: true },
    {
      field: "total_credit_used",
      headerName: "Credit Used",
      flex: 1,
      sortable: true,
      renderCell: (params) => {
        const value = params.row?.total_credit_used;
        return value !== undefined && value !== null && value !== ""
          ? value
          : <span style={{ color: "#aaa" }}>N/A</span>;
      },
    },
    {
      field: "download",
      headerName: "Download",
      flex: 1,
      sortable: false,
      renderCell: (params) =>
        params.row.url ? (
          <Button
            className="Download_Button"
            variant="contained"
            size="small"
            startIcon={
              downloadingId === params.row.file_id ? (
                <CircularProgress size={18} color="inherit" />
              ) : (
                <FiDownload size={18} />
              )
            }
            disabled={downloadingId === params.row.file_id}
            onClick={() => handleDownload(params.row.filename, params.row.file_id)}
          />
        ) : (
          <span style={{ color: "#aaa" }}>N/A</span>
        ),
    },
  ], [downloadingId]);

  const rows = useMemo(
    () =>
      downloads.map((entry, idx) => ({
        ...entry,
        id: entry.file_id || idx,
        index: idx + 1,
      })),
    [downloads]
  );

  const filteredRows = useMemo(
    () =>
      rows.filter(row =>
        Object.values(row)
          .join(" ")
          .toLowerCase()
          .includes(searchText.toLowerCase())
      ),
    [rows, searchText]
  );

  useEffect(() => {
    setPage(0);
  }, [filteredRows]);

  return (

      <Box sx={{ p: { xs: 0, md: 0 }, background: "#f8fafc", minHeight: "80vh" }}>
        <Box sx={{ mb:5}} >
          <Typography variant="h3"  gutterBottom sx={{ fontSize: '2.5rem',color: "#5a5c69" ,}} >
            Download Logs
          </Typography>
          <Typography variant="body1" sx={{ fontSize: '1.2rem',color:"#858796" }}>
            Select code to securely access and download your documentation file. Review your download history to efficiently resume work from where you left off.
          </Typography>
        </Box>
        <Box sx={{  m: "auto", background: "#fff", borderRadius: 2, boxShadow: 3, p: 2 }}>
          {/* New Wrapper for Heading */}


        <div className="downloads-header">
          <h6 className="downloads-title">Documents</h6>
          <TextField
            size="small"
            variant="outlined"
            placeholder="Search…"
            value={searchText}
            onChange={e => setSearchText(e.target.value)}
            className="downloads-search"
          />
        </div>

          <div style={{ width: "100%" }}>
            <DataGrid
              autoHeight
              rows={filteredRows}
              columns={columns}
              pagination
              paginationModel={{ page, pageSize }}
              onPaginationModelChange={({ page, pageSize }) => {
                setPage(page);
                setPageSize(pageSize);
              }}
              pageSizeOptions={[5, 10, 25, 50]}
              loading={downloadsLoading}
              disableSelectionOnClick
              sx={{
                background: "#fff",
                borderRadius: 2,
                "& .MuiDataGrid-columnHeaders": { background: "#e3e7fd", color: "#1a237e", fontWeight: 700 },
                "& .MuiDataGrid-row": { fontSize: "1rem", "&:hover": { backgroundColor: "#f5f7fb" } },
                "& .MuiDataGrid-cell": { borderBottom: "1px solid #f0f0f0" },
                "& .MuiDataGrid-footerContainer": { backgroundColor: "#f8fafc" },
              }}
            />
          </div>
        </Box>
      </Box>
  
  );
};

export default Download;
