import React, { useEffect, useState } from "react";
import { alpha } from '@mui/material/styles';
import {Dialog, DialogTitle,DialogContent, DialogContentText, DialogActions, Button, Box, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, TableSortLabel, Toolbar, Typography, Paper, Checkbox, IconButton, Tooltip, Stack } from '@mui/material';
import { visuallyHidden } from '@mui/utils';
import DeleteIcon from '@mui/icons-material/Delete';
import Navbar from "../navbar/Navbar";
import axios from 'axios';
import Alert from '@mui/material/Alert';
import Collapse from '@mui/material/Collapse';
import CloseIcon from '@mui/icons-material/Close';

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

const headCells = [
  {
    id: 'new_feature',
    numeric: false,
    label: 'New Feature',
  },
  {
    id: 'issue',
    numeric: false,
    label: 'Bug',
  },
  {
    id: 'problems_pw',
    numeric: false,
    label: 'Had issues',
  },
  {
    id: 'issue_type1',
    numeric: false,
    label: 'Issues Viewing',
  },
  {
    id: 'issue_type2',
    numeric: false,
    label: 'Issues Searching',
  },
  {
    id: 'issue_type3',
    numeric: false,
    label: 'Issues Updating',
  },
  {
    id: 'date_submitted',
    numeric: false,
    label: 'Date Submitted',
  },
  {
    id: 'degree_imp',
    numeric: true,
    label: 'Degree Importance',
  },
];

function EnhancedTableHead(props) {
  const { onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } =
    props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox">
          <Checkbox
            color="primary"
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{
              'aria-label': 'select all desserts',
            }}
          />
        </TableCell>
        {headCells.map((headCell) => (
          <TableCell
          key={headCell.id}
          align="left" // Align the header and its content to center
          padding={headCell.disablePadding ? 'none' : 'normal'}
          sortDirection={orderBy === headCell.id ? order : false}
        >
          <TableSortLabel
            active={orderBy === headCell.id}
            direction={orderBy === headCell.id ? order : 'asc'}
            onClick={createSortHandler(headCell.id)}
          >
            {headCell.label}
            {orderBy === headCell.id ? (
              <Box component="span" sx={visuallyHidden}>
                {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
              </Box>
            ) : null}
          </TableSortLabel>
        </TableCell>        
        ))}
      </TableRow>
    </TableHead>
  );
}

const AdminFeedback = ({authUser, token}) => {
  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('calories');
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(7);
  const [feedbackList, setFeedbackList] = useState([]);
  const [openSuccess, setOpenSuccess] = useState(false);
  const [openFail, setOpenFail] = useState(false);
  const [open,setOpen] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  const importanceOptions = [
    { value: 5, label: 'Highly Important' },
    { value: 4, label: 'Important' },
    { value: 3, label: 'Moderate' },
    { value: 2, label: 'Low' },
    { value: 1, label: 'Minimal' },
  ];

  const config = {
    headers: { Authorization: `Bearer ${token}` }
  };

  // Get initial list of feedback
  useEffect(() => {
    axios.get('http://localhost:8083/feedbacks/getAllFeedback',config)
    .then ((result) => {
      const feedbacksWithId = result.data.map((feedback, index) => {
        return { ...feedback, id: index };
      });
      setFeedbackList(feedbacksWithId);
    })
    .catch(error => {
      if (error.response)
        console.log("Error is", error.response.data);
    });
  }, []);

  const handleDeleteClick = () => {
    setOpen(true);
  };

  const handleConfirmDelete = () => {
    // Your delete action logic here
    setOpenSuccess(false);
    setOpenFail(false);
    setOpen(false);
    axios({
      method: 'delete',
      url: 'http://localhost:8083/feedbacks/deleteFeedbacksByIds',
      data: getSelectedFeedbackIds(),
      headers: { Authorization: `Bearer ${token}` }
    })
    .then((response) => {
      axios.get('http://localhost:8083/feedbacks/getAllFeedback', config)
      .then((result) => {
        const feedbacksWithId = result.data.map((feedback, index) => {
          return { ...feedback, id: index };
        });
        setFeedbackList(feedbacksWithId);
        setSelected([]);
      })
      .catch(error => {
        if (error.response)
          console.log("Error is", error.response.data);
      });
      setOpenSuccess(true);
    })
    .catch((error) => {
      console.log(error);
      setOpenFail(true);
    });
  };

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelected = feedbackList.map((n) => n.id);
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, id) => {
    const selectedIndex = selected.indexOf(id);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      );
    }
    setSelected(newSelected);
  };

  const getSelectedFeedbackIds = () => {
    return selected.map((selectedIndex) => {
        return feedbackList[selectedIndex].feedback_id;
    });
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const isSelected = (id) => selected.indexOf(id) !== -1;

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - feedbackList.length) : 0;

  const visibleRows = React.useMemo(
      () =>
        stableSort(feedbackList, getComparator(order, orderBy)).slice(
          page * rowsPerPage,
          page * rowsPerPage + rowsPerPage,
        ),
      [feedbackList, order, orderBy, page, rowsPerPage],
    );

  return (
    <div className="App">
            <Navbar firstNav={{to: "", label: ""}} 
                    secondNav={{to: "", label: ""}}
                    thirdNav={{to: "", label: ""}} 
                    authUser={authUser}
                    searchBarEnabled={false}/>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
      <DialogTitle id="alert-dialog-title">{"Attention!"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to delete the selected feedback entries?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleConfirmDelete} autoFocus>
            Yes
          </Button>
          <Button onClick={handleClose}>No</Button>
        </DialogActions>
      </Dialog>
    <Box sx={{ width: '96%', marginTop: '1%', marginLeft: '2%', height: '95%'}}>
      <Stack spacing={1.5}>
        <Collapse in={openSuccess}>
                <Alert severity="success" sx={{ marginTop: 2 }}
                  action={
                    <IconButton
                      aria-label="close"
                      color="inherit"
                      size="small"
                      onClick={() => {
                        setOpenSuccess(false);
                      }}
                    >
                      <CloseIcon fontSize="inherit" />
                    </IconButton>
                  }>
                  Feedback entries deleted successfully!
                </Alert>
        </Collapse>
        <Collapse in={openFail}>
                <Alert severity="warning" sx={{ marginTop: 2 }}
                  action={
                    <IconButton
                      aria-label="close"
                      color="inherit"
                      size="small"
                      onClick={() => {
                        setOpenFail(false);
                      }}
                    >
                      <CloseIcon fontSize="inherit" />
                    </IconButton>
                  }>
                  There was a problem when submitting the request, please reload the page and try again.
                </Alert>
        </Collapse>
        <Paper sx={{ width: '100%', mb: 2, backgroundColor: '#F2F2F2' }}>
        <Toolbar
        sx={{
          pl: { sm: 2 },
          pr: { xs: 1, sm: 1 },
          ...(selected.length > 0 && {
            bgcolor: (theme) =>
              alpha(theme.palette.primary.main, theme.palette.action.activatedOpacity),
          }),
        }}
      >
        {selected.length > 0 ? (
          <Stack spacing={1.5} sx={{paddingTop:2}}>
            <Typography
              sx={{ flex: '1 1 100%' }}
              variant="h6"
              id="tableTitle"
              component="div"
            >
            Feedback List
            </Typography>
            <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ width: '100%'}}>
              <Typography
                sx={{ flex: '1 1 100%' }}
                color="inherit"
                variant="subtitle1"
                component="div"
              >
              {selected.length} entries selected
              </Typography>
              <Tooltip title="Delete">
                <IconButton onClick={handleDeleteClick}>
                  <DeleteIcon />
                </IconButton>
              </Tooltip>
            </Stack>
          </Stack>
        ) : (
          <Stack spacing={1.5} sx={{paddingTop:2}}>
            <Typography
              sx={{ flex: '1 1 100%' }}
              variant="h6"
              id="tableTitle"
              component="div"
            >
            Feedback List
            </Typography>
            <Typography
              sx={{ flex: '1 1 100%' }}
              variant="h8"
              id="tableSubTitle"
              component="div"
            >
            Feedback from users
            </Typography>
          </Stack>
        )}
      </Toolbar>
          <TableContainer>
            <Table
              sx={{ minWidth: 750 }}
              aria-labelledby="tableTitle"
              size='medium'
            >
              <EnhancedTableHead
                numSelected={selected.length}
                order={order}
                orderBy={orderBy}
                onSelectAllClick={handleSelectAllClick}
                onRequestSort={handleRequestSort}
                rowCount={feedbackList.length}
              />
              <TableBody>
                {visibleRows.map((row, index) => {
                  const isItemSelected = isSelected(row.id);
                  const labelId = `enhanced-table-checkbox-${index}`;

                  return (
                    <TableRow
                      hover
                      onClick={(event) => handleClick(event, row.id)}
                      role="checkbox"
                      aria-checked={isItemSelected}
                      tabIndex={-1}
                      key={row.id}
                      selected={isItemSelected}
                      sx={{ cursor: 'pointer' }}
                    >
                      <TableCell padding="checkbox">
                        <Checkbox
                          color="primary"
                          checked={isItemSelected}
                          inputProps={{
                            'aria-labelledby': labelId,
                          }}
                        />
                      </TableCell>
                      <TableCell align="left">{row.new_feature}</TableCell>
                      <TableCell align="left">{row.issue}</TableCell>
                      <TableCell align="left">{row.problems_pw ? 'Yes' : 'No'}</TableCell>
                      <TableCell align="left">{row.issue_type1? 'Yes' : 'No'}</TableCell>
                      <TableCell align="left">{row.issue_type2? 'Yes' : 'No'}</TableCell>
                      <TableCell align="left">{row.issue_type3? 'Yes' : 'No'}</TableCell>
                      <TableCell align="left">{row.date_submitted}</TableCell>
                      <TableCell align="left">{importanceOptions.find(option => option.value ===row.degree_imp).label}</TableCell>
                    </TableRow>
                  );
                })}
                {emptyRows > 0 && (
                  <TableRow
                    style={{
                      height: 50 * emptyRows,
                    }}
                  >
                    <TableCell colSpan={6} />
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[5, 7, 10, 15, 25, 50]}
            component="div"
            count={feedbackList.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Paper>
      </Stack>
    </Box>
    </div>
  );
}

export default AdminFeedback;