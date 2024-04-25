import React , {useState,useEffect} from "react";
import Navbar from "../navbar/Navbar";
import { Button, Avatar, Typography, Rating, Box, Table, TableBody, TableCell, TableContainer, TablePagination, TableRow, Paper, Stack} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const ReaderHome = ({ authUser, token }) => {
  const navigate = useNavigate();
  const [bio, setBio] = useState("")
  const viewBook = (bookId) => {
    navigate(`/viewBook/${bookId}`);
  }

  const addNewBook = () => {
    navigate("/addBook")
    console.log("Button clicked!");
  };

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(3);
  const [feedbackList, setFeedbackList] = useState([]);

  const genres = [
      { id: 0, name: 'Fantasy' },
      { id: 1, name: 'Mystery' },
      { id: 2, name: 'Romance' },
      { id: 3, name: 'Science Fiction' },
      { id: 4, name: 'Horror' },
      { id: 5, name: 'Historical Fiction' },
      { id: 6, name: 'Biography' },
      { id: 7, name: 'Self-Help' },
      { id: 8, name: 'Poetry' },
      { id: 9, name: 'Adventure' }
    ];
    

    const config = {
        headers: { Authorization: `Bearer ${token}` }
    };

  // Get initial list of feedback
  useEffect(() => {
      axios.get(`http://localhost:8083/books/getAllBooksByAuthorId?uid=${authUser.uid}`,config)
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

  const genrePaperStyle = {
      backgroundColor: '#EEEEEE',
      borderRadius: 10,
      padding: '5px 10px', // Adjust padding as needed
  };

  const handleChangePage = (event, newPage) => {
      setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
      setRowsPerPage(parseInt(event.target.value, 10));
      setPage(0);
  };

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
      page > 0 ? Math.max(0, (1 + page) * rowsPerPage - feedbackList.length) : 0;

  const visibleRows = React.useMemo(
      () =>
          feedbackList.slice(
          page * rowsPerPage,
          page * rowsPerPage + rowsPerPage,
          ),
      [feedbackList, page, rowsPerPage],
      );

  useEffect(() => {
    axios.get(`http://localhost:8082/users/getUserDetails?uid=${authUser.uid}`, config)
      .then((result) => {
        setBio(result.data);
      })
      .catch(error => {
        if (error.response)
          console.log("Error is", error.response.data);
      });
  }, []);

  return (
    <div className="App">
      <Navbar firstNav={{ to: "/", label: "My Books" }}
        secondNav={{ to: "/settings", label: "Settings" }}
        thirdNav={{ to: "/feedback", label: "Feedback" }}
        authUser={authUser}
        searchBarEnabled={false} />

      <div className="settings">
        <Box sx={{ paddingX: 2, margin: '8 auto', maxWidth: 1700, marginLeft: 2, marginTop: 5}}>
          <Stack direction="row" spacing={5}>
            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
              <Box sx={{ flexGrow: 1 }}>
                <Stack direction="column" spacing={2} sx={{ display: 'flex', justifyContent: 'center' }}>
                  <Avatar
                    alt="Profile picture"
                    src={authUser.photoURL}
                    sx={{ width: '12em', height: '12em' }}
                    align="center"
                  />
                  <Box sx={{ textAlign: 'center' }} >
                    <Typography align="center" variant="header1" style={{ fontWeight: 'bold', color: '#1E5949', fontSize: '1.5rem' }}>
                      {authUser.displayName}
                    </Typography>
                  </Box>
                  <Typography align="center" variant="body1" style={{ fontSize: '1rem', maxWidth: 260, color: '#1E5949', marginBottom: 5 }}>
                    {bio}
                  </Typography>
                </Stack>
              </Box>
            </Box>
            <Stack spacing={1.5} sx={{ width: '85%'}}>
                      <Paper sx={{ width: '100%', mb: 2, borderRadius: 5}}>
                        <TableContainer sx={{ borderRadius: 5}}>
                            <Table
                            sx={{ minWidth: 750}}
                            aria-labelledby="tableTitle"
                            size='medium'
                            >
                            <TableBody sx={{ width: '100%', mb: 2, borderRadius: 5}}>
                                {visibleRows.map((row) => {
                                return (
                                    <TableRow sx={{backgroundColor: '#F2F2F2'}}>
                                    <TableCell align="left">
                                      <button onClick={() => viewBook(row.book_id)} style={{ border: 'none', padding: 0, background: 'none', cursor:'pointer'}}>
                                          <img src={row.cover_link} style={{ width: '6.2rem', height: '9.5rem' }}/>
                                      </button>
                                    </TableCell>
                                    <TableCell align="left">
                                        <Stack spacing={1.75}>
                                            <div style={{ fontSize: '1.5em', fontWeight:'bold'}}>{row.title}</div>
                                            <div style={{ fontSize: '1.2em' }}>{authUser.displayName}</div>
                                            <Stack direction="row" spacing={1}>
                                                <Paper style={genrePaperStyle}>{genres.find(genre => genre.id === row.category1_id).name}</Paper>
                                                <Paper style={genrePaperStyle}>{genres.find(genre => genre.id === row.category2_id).name}</Paper>
                                                <Paper style={genrePaperStyle}>{genres.find(genre => genre.id === row.category3_id).name}</Paper>
                                            </Stack>
                                        </Stack>
                                    </TableCell>
                                    <TableCell align="center" sx={{ textAlign: 'center' }}>
                                        <Stack spacing={1} sx={{ alignItems: 'center', justifyContent: 'center', textAlign: 'center' }}>
                                            <Rating name="read-only" value={row.rating} precision={0.1} readOnly />
                                            <div>({row.ratingNo} reviews)</div>
                                        </Stack>
                                    </TableCell>
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
                            rowsPerPageOptions={[3, 5, 7, 10]}
                            component="div"
                            count={feedbackList.length}
                            rowsPerPage={rowsPerPage}
                            page={page}
                            onPageChange={handleChangePage}
                            onRowsPerPageChange={handleChangeRowsPerPage}
                        />
                        </Paper>
                        <Button
                          variant="contained"
                          onClick={addNewBook}
                          sx={{ marginLeft: 'auto', color: '#ffffff', backgroundColor: '#60A494', width: '15%', textTransform: 'none', borderRadius: 4}}
                        >
                          Add New Book
                        </Button>
                </Stack>
          </Stack>
        </Box>
      </div >
    </div >
  );
};

export default ReaderHome;