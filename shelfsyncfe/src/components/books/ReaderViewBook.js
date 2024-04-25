import React, { useState, useEffect} from "react";
import Navbar from "../navbar/Navbar";
import { Card, Avatar, CardContent, Paper, Stack, TableContainer, Table, TableBody, TableRow, TableCell, TablePagination} from "@mui/material";
import { Box } from "@mui/material";
import Typography from '@material-ui/core/Typography';
import Rating from '@mui/material/Rating';
import axios from 'axios';

const ReaderViewBook = ({ authUser, bookId, token}) => {

  const[book,setBook] = useState("");
  const config = {
    headers: { Authorization: `Bearer ${token}` }
  };
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(1);
  const [feedbackList, setFeedbackList] = useState([]);

  const genrePaperStyle = {
        backgroundColor: '#EEEEEE',
        borderRadius: 10,
        padding: '5px 10px', // Adjust padding as needed
    };

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

  // Get initial list of feedback
  useEffect(() => {
      axios.get(`http://localhost:8083/reviews/getReviewsByBookId?bookId=${bookId}`,config)
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
    axios.get(`http://localhost:8083/books/getBookByBookIdAndReaderId?uid=${authUser.uid}&book_id=${bookId}`,config)
        .then(response => {
          setBook(response.data);
        })
        .catch(error => {
          console.error('Error fetching book:', error);
        });
  }, []);

  return (
    <div className="App">
      <Navbar firstNav={{ to: "/", label: "My Books" }}
        secondNav={{ to: "/settings", label: "Settings" }}
        thirdNav={{ to: "/feedback", label: "Feedback" }}
        authUser={authUser}
        searchBarEnabled={true} />

      <div className="add_books">
        <Box sx={{
          paddingX: 2, margin: '8 auto', width: 1600, marginLeft: 5, marginTop: 5, marginBottom: 5, display: 'flex', justifyContent: 'center', alignItems: 'center'
        }}>
          <Stack direction="column" spacing={2}>
            <Stack direction="row" spacing={1}>
              <Box>
                <Stack direction="column" spacing={1}>
                  <div>
                    <img
                      src={book.cover_link}
                      alt="Book cover"
                      style={{ width: '15rem', height: '20rem' }}
                    />
                  </div>
                </Stack>
              </Box>

              <Box >
                <Stack direction="column" spacing={2}>
                  <Typography variant="header1" style={{ fontWeight: 'bold', fontSize: '2.5rem' }}>
                    {book.title}
                  </Typography>
                  <Typography variant="header1" style={{ fontWeight: 'bold', fontSize: '1.5rem' }}>
                    {book.name}
                  </Typography>
                  <Stack direction="row" spacing={1}>
                    <Paper style={genrePaperStyle}>{genres.find(genre => genre.id === book.category1_id)?.name}</Paper>
                    <Paper style={genrePaperStyle}>{genres.find(genre => genre.id === book.category2_id)?.name}</Paper>
                    <Paper style={genrePaperStyle}>{genres.find(genre => genre.id === book.category3_id)?.name}</Paper>
                  </Stack>
                  <Stack direction="row" spacing={1} sx={{ display: "flex", alignItems: "center" }}>
                    <Rating name="rating-read" value={book.rating} readOnly />
                    <Typography variant="subtitle1" color="text.secondary">
                      ({book.ratingNo} reviews)
                    </Typography>
                  </Stack>
                  <Typography variant="header1" style={{ fontWeight: 'bold', fontSize: '1rem', maxWidth: '50rem' }}>
                      {book.description}
                  </Typography>
                </Stack>
              </Box>
            </Stack>
            <Stack spacing={1.5} sx={{ height:'20%'}}>
                      <Paper sx={{ width: '100%', mb: 2, borderRadius: 5}}>
                      <Typography
                          sx={{ flex: '1 1 100%', padding: 2, margin: 1}}
                          variant="h6"
                          id="tableTitle"
                          component="div"
                        >
                        Reviews
                        </Typography>
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
                                    <Card sx={{ borderRadius: '1.5rem', borderWidth: '2rem' }}>
                                      <Stack direction='row' spacing={2} margin={2} alignItems="center">
                                        <Avatar
                                          alt="Profile picture"
                                          src={row.profile_picture_link}
                                          sx={{ width: '3em', height: '3em' }}
                                        />
                                        <Stack direction='column'>
                                          <Typography>
                                            {row.name}
                                          </Typography>
                                          <Stack direction="row" spacing={1} sx={{ display: "flex", alignItems: "center", size: '0.7rem' }}>
                                            <Rating name="rating-read" value={row.rating} precision={0.1} readOnly />
                                          </Stack>
                                        </Stack>
                                        <CardContent>
                                          <Typography variant="body2" color="text.secondary">
                                            {row.comment}
                                          </Typography>
                                        </CardContent>
                                      </Stack>
                                    </Card>
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
                            rowsPerPageOptions={[1,2]}
                            component="div"
                            count={feedbackList.length}
                            rowsPerPage={rowsPerPage}
                            page={page}
                            onPageChange={handleChangePage}
                            onRowsPerPageChange={handleChangeRowsPerPage}
                        />
                  </Paper>
            </Stack>
          </Stack>
        </Box>
      </div>
    </div>
  );
};

export default ReaderViewBook;