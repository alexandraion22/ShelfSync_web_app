import React, { useEffect, useState } from "react";
import Navbar from "../navbar/Navbar";
import { FormControlLabel, Radio, TextField, Rating, Box, Table, TableBody, TableCell, TableContainer, TablePagination, TableRow, Paper, IconButton, Stack, Select, MenuItem } from '@mui/material';
import axios from 'axios';
import SearchIcon from '@mui/icons-material/Search';
import { useNavigate } from 'react-router-dom';

const DidNotFinishReader = ({authUser, token}) => {
    const navigate = useNavigate();
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(3);
    const [feedbackList, setFeedbackList] = useState([]);
    const [originalFeedbackList, setOriginalFeedbackList] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [value, setValue] = useState(null);
    const [switchVar, setSwitchVar] = useState(false);

    
    const viewBook = (bookId) => {
        navigate(`/viewBook/${bookId}`);
      }
    
    const handleRadioChange = (event) => {
        const newValue = Number(event.target.value);
        setValue(newValue);
        // Perform filtering based on the selected minimum rating
        const filteredFeedbackList = originalFeedbackList.filter(book =>
            book.rating > newValue
        );
        setFeedbackList(filteredFeedbackList);
    };    

    const handleSearch = () => {
        // Perform filtering based on the search term
        const filteredFeedbackList = originalFeedbackList.filter(book =>
            book.title.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFeedbackList(filteredFeedbackList);
    };

    const handleChange = (event) => {
        setSearchTerm(event.target.value);
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
      

    const config = {
        headers: { Authorization: `Bearer ${token}` }
    };

    const [selectedGenres, setSelectedGenres] = useState(() =>
        genres.map(genre => genre.id)
    );

    const handleCheckboxChange = (genreId) => {
        setSelectedGenres(prevSelectedGenres => {
            if (prevSelectedGenres.includes(genreId)) {
                return prevSelectedGenres.filter(id => id !== genreId);
            } else {
                return [...prevSelectedGenres, genreId];
            }
        });
    };

    // Filter feedbackList based on selected genres
    useEffect(() => {
        const filteredFeedbackList = originalFeedbackList.filter(book =>
            selectedGenres.some(genreId =>
                book.category1_id === genreId || // Check if category1_id matches any selected genre
                book.category2_id === genreId || // Check if category2_id matches any selected genre
                book.category3_id === genreId    // Check if category3_id matches any selected genre
            )
        );
        setFeedbackList(filteredFeedbackList);
    }, [selectedGenres, originalFeedbackList]);

    // Get initial list of feedback
    useEffect(() => {
        axios.get(`http://localhost:8083/books/getAllBooksByReaderId?uid=${authUser.uid}`,config)
        .then ((result) => {
        const feedbacksWithId = result.data.filter(feedback => feedback.progress === "dnf").map((feedback, index) => {
            return { ...feedback, id: index };
        });
        setOriginalFeedbackList(feedbacksWithId);
        setFeedbackList(feedbacksWithId);
        })
        .catch(error => {
        if (error.response)
            console.log("Error is", error.response.data);
        });
    }, [switchVar]);

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

    const handleProgressChange = (event, id) => {
        const { value } = event.target;
        const newData = feedbackList.map(row => {
            if (row.id === id) {
                return { ...row, progress: value };
            }
            return row;
        });

        // Update your state with the new data
        setFeedbackList(newData);

        if (feedbackList[id].listElement_id === -1) {
            axios.post("http://localhost:8083/list_elements/createElement",
                { uid: authUser.uid, current_pages: 0, book_id:feedbackList[id].book_id, progress: value},
                config)
                .then((result) => {
                    console.log(result);
                    console.log("Result body is", result.data);
                    console.log("Result status is", result.status);
                    setSwitchVar(switchVar => !switchVar);
                })
                .catch(error => {
                    if (error.response)
                    console.log("Error is", error.response.data);
                });
            }
        else
        {
            if(value !== 'nr'){
                axios.put("http://localhost:8083/list_elements/updateElementById",
                { element_id: feedbackList[id].listElement_id, current_pages: 0, progress:value},
                config)
                .then((result) => {
                    console.log(result);
                    console.log("Result body is", result.data);
                    console.log("Result status is", result.status);
                    setSwitchVar(switchVar => !switchVar);
                })
                .catch(error => {
                    if (error.response)
                    console.log("Error is", error.response.data);
                });
            }
            else
            {
                axios.delete(`http://localhost:8083/list_elements/deleteElementById?id=${feedbackList[id].listElement_id}`,config)
                .then ((result) => {
                    console.log(result);
                    console.log("Result body is", result.data);
                    console.log("Result status is", result.status);
                    setSwitchVar(switchVar => !switchVar);
                })
                .catch(error => {
                if (error.response)
                    console.log("Error is", error.response.data);
                });
            }
        }
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
    return (
          <div className="App">
            <Navbar firstNav={{to: "/", label: "My Books"}} 
                    secondNav={{to: "/settings", label: "Settings"}}
                    thirdNav={{to: "/feedback", label: "Feedback"}}
                    authUser={authUser}
                    searchBarEnabled={true}/>
            <Box sx={{ width: '96%', marginTop: '1%', marginLeft: '2%', height: '95%'}}>
            <Stack spacing={3}>
                <TextField
                    variant="outlined"
                    placeholder="Search title..."
                    value={searchTerm}
                    onChange={handleChange}
                    InputProps={{
                        startAdornment: (
                            <IconButton onClick={handleSearch}>
                                <SearchIcon />
                            </IconButton>
                        ),
                        style: {
                            backgroundColor: '#EEEEEE',
                            borderRadius: 20,
                            height: 30,
                        }
                    }}
                />

                <Stack direction="row" spacing={8}>
                    <Stack spacing={10} sx={{ width: '15%'}}>
                        <Paper style={{ borderRadius: 15, padding: 10, backgroundColor: '#EEEEEE'}}>
                            <div style={{ fontWeight: 'bold', marginBottom: 10, fontSize: '1.2em' }}>Genres</div>
                            <div>
                                {genres.map(genre => (
                                    <div key={genre.id} style={{ marginBottom: 5 }}>
                                        <input
                                            type="checkbox"
                                            id={`genre-${genre.id}`}
                                            value={genre.id}
                                            checked={selectedGenres.includes(genre.id)}
                                            onChange={() => handleCheckboxChange(genre.id)}
                                            style={{ marginRight: 10, transform: 'scale(1.5)'}}
                                        />
                                        <label htmlFor={`genre-${genre.id}`} style={{ marginLeft: 5 }}>{genre.name}</label>
                                    </div>
                                ))}
                            </div>
                        </Paper>
                        <Paper style={{ borderRadius: 15, padding: 10, backgroundColor: '#EEEEEE', marginTop:40}}>
                            <div style={{ fontWeight: 'bold', marginBottom: 10, fontSize: '1.1em' }}>Minimum Rating</div>
                            <div>
                                {Array.from({ length: 5 }, (_, index) => (
                                    <FormControlLabel
                                        key={index + 1}
                                        value={index + 1}
                                        control={<Radio checked={value === index + 1} onChange={handleRadioChange} style={{transform: 'scale(0.75)'}}/>}
                                        label={<Rating name="read-only" value={index + 1} readOnly size="small" precision={0.1} style={{transform: 'scale(1.2)'}}/>}
                                        labelPlacement="end"
                                    />
                                ))}
                            </div>
                        </Paper>
                    </Stack>
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
                                            <div style={{ fontSize: '1.2em' }}>{row.name}</div>
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
                                    <TableCell align="center">
                                        <Select 
                                            value={row.progress} 
                                            onChange={(event) => handleProgressChange(event, row.id)} 
                                            style={{
                                                borderRadius: 20,
                                                backgroundColor: '#FFFFFF',
                                                width: '15em',
                                                height: '2em'
                                            }}
                                        >
                                            <MenuItem value="nr">Not Read</MenuItem>
                                            <MenuItem value="cr">Currenly Reading</MenuItem>
                                            <MenuItem value="dnf">Did Not Finish</MenuItem>
                                            <MenuItem value="wtr">Want to Read</MenuItem>
                                            <MenuItem value="read">Read</MenuItem>
                                        </Select>
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
                    </Stack>
                    </Stack>
                </Stack>
            </Box>
          </div>
    );
};

export default DidNotFinishReader;