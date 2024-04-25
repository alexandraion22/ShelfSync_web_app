import React, { useState, useEffect } from "react";
import Navbar from "../navbar/Navbar";
import { Stack } from "@mui/material";
import { Box } from "@mui/material";
import TextField from '@mui/material/TextField';
import Typography from '@material-ui/core/Typography';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const EditBookAuthor = ({ authUser, bookId, token}) => {
  const navigate = useNavigate();
  const [photoUrl, setPhotoUrl] = useState("");
  const [title, setTitle] = useState("");
  const [bookDescription, setBookDescription] = useState("");

  useEffect(() => {
    axios.get(`http://localhost:8083/books/getBookByBookIdAuthor?book_id=${bookId}`,config)
        .then(response => {
          setPhotoUrl(response.data.cover_link);
          setTitle(response.data.title);
          setBookDescription(response.data.description);
          setCategory1(response.data.category1_id);
          setCategory2(response.data.category2_id);
          setCategory3(response.data.category3_id);
        })
        .catch(error => {
          console.error('Error fetching book:', error);
        });
  }, []);

  const [category1, setCategory1] = useState(0);
  const [category2, setCategory2] = useState(1);
  const [category3, setCategory3] = useState(3);
  const config = {
    headers: { Authorization: `Bearer ${token}` }
  };

  const categoryOptions = [
        { value: 0, label: 'Fantasy' },
        { value: 1, label: 'Mystery' },
        { value: 2, label: 'Romance' },
        { value: 3, label: 'Science Fiction' },
        { value: 4, label: 'Horror' },
        { value: 5, label: 'Historical Fiction' },
        { value: 6, label: 'Biography' },
        { value: 7, label: 'Self-Help' },
        { value: 8, label: 'Poetry' },
        { value: 9, label: 'Adventure' }
  ];

  const addBook = () => {
    console.log(bookDescription);
    axios.put("http://localhost:8083/books/updateBookById",
                { book_id:bookId, title: title, description:bookDescription, pages:314, category1_id:category1, category2_id:category2, category3_id:category3, cover_link:photoUrl},
                config)
                .then((result) => {
                    console.log(result);
                    console.log("Result body is", result.data);
                    console.log("Result status is", result.status);
                    navigate(`/viewBook/${bookId}`)
                })
                .catch(error => {
                    if (error.response)
                    console.log("Error is", error.response.data);
                });
  };

  return (
    <div className="App">
      <Navbar firstNav={{ to: "/", label: "My Books" }}
        secondNav={{ to: "/settings", label: "Settings" }}
        thirdNav={{ to: "/feedback", label: "Feedback" }}
        authUser={authUser}
        searchBarEnabled={false} />

      <div className="add_books">
        <Box sx={{
          paddingX: 2, margin: '8 auto', maxWidth: 1200, marginLeft: 2, marginTop: 5, marginBottom: 5, display: 'flex', justifyContent: 'center', alignItems: 'center'
        }}>
          <Stack direction="column" spacing={2}>
            <Stack direction="row" spacing={1}>
              <Box>
                <Stack direction="column" spacing={2}>
                  {photoUrl !== "" ? (
                    <div>
                      <img
                        src={photoUrl}
                        alt="Book cover"
                        style={{ width: '15rem', height: '23rem' }}
                      />
                    </div>
                  ) : (
                    <div>
                      <img
                        src={"https://upload.wikimedia.org/wikipedia/commons/6/65/No-Image-Placeholder.svg"}
                        alt="Default book cover"
                        style={{ width: '16rem', height: '22rem' }}
                      />
                    </div>
                  )}
                  <TextField id="outlined-controlled"
                    fullWidth
                    size="small"
                    value={photoUrl}
                    placeholder="Photo URL"
                    onChange={(e) => setPhotoUrl(e.target.value)}
                    variant="outlined"
                    style={{ backgroundColor: '#F6F8FA', marginTop: -10, width: '15rem' }}
                  />
                </Stack>
              </Box>

              <Box >
                <Stack direction="column" spacing={2}>
                  <TextField id="outlined-controlled"
                    fullWidth
                    size="medium"
                    value={title}
                    placeholder="Add book title"
                    onChange={(e) => setTitle(e.target.value)}
                    variant="outlined"
                    style={{ backgroundColor: '#F6F8FA', marginTop: -10, width: '40rem' }}
                  />
                  <Typography variant="header1" style={{ fontWeight: 'bold', color: '#1E5949', fontSize: '1.5rem' }}>
                    {authUser.displayName}
                  </Typography>
                  <Stack direction="row" spacing={2}>
                      <TextField
                        select
                        defaultValue={category1}
                        onChange={(e) => setCategory1(e.target.value)}
                        InputProps={{
                          style: {
                            borderRadius: 20,
                            backgroundColor: '#EEEEEE',
                            width: '10em',
                            height: '2em'
                          }
                        }}
                      >
                        {categoryOptions.map((option) => (
                          <MenuItem key={option.value} value={option.value}>
                            {option.label}
                          </MenuItem>
                        ))}
                      </TextField>
                      <TextField
                        select
                        defaultValue={category2}
                        onChange={(e) => setCategory2(e.target.value)}
                        InputProps={{
                          style: {
                            borderRadius: 20,
                            backgroundColor: '#EEEEEE',
                            width: '10em',
                            height: '2em'
                          }
                        }}
                      >
                        {categoryOptions.map((option) => (
                          <MenuItem key={option.value} value={option.value}>
                            {option.label}
                          </MenuItem>
                        ))}
                      </TextField>
                      <TextField
                        select
                        defaultValue={category3}
                        onChange={(e) => setCategory3(e.target.value)}
                        InputProps={{
                          style: {
                            borderRadius: 20,
                            backgroundColor: '#EEEEEE',
                            width: '10em',
                            height: '2em'
                          }
                        }}
                      >
                        {categoryOptions.map((option) => (
                          <MenuItem key={option.value} value={option.value}>
                            {option.label}
                          </MenuItem>
                        ))}
                      </TextField>
                  </Stack>
                  <TextField id="outlined-controlled"
                    fullWidth
                    multiline
                    rows={10}
                    size="small"
                    value={bookDescription}
                    placeholder="Add book description"
                    onChange={(e) => setBookDescription(e.target.value)}
                    variant="outlined"
                    style={{ backgroundColor: '#F6F8FA', width: '40rem' }}
                  />
                </Stack>
              </Box>
            </Stack>
            <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 10, marginBottom: 10, borderRadius: 5 }}>
              <Button variant="contained"
                style={{ backgroundColor: '#60A494', color: '#ffffff', textTransform: 'none', borderRadius: 8 }}
                onClick={addBook}
                disabled={title === "" || bookDescription === "" || photoUrl.trim() === ""}>
                Save changes
              </Button>
            </div>
          </Stack>

        </Box>
      </div>
    </div>
  );
};

export default EditBookAuthor;