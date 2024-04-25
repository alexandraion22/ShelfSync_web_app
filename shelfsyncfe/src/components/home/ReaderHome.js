import React , {useState,useEffect} from "react";
import Navbar from "../navbar/Navbar";
import Stack from '@mui/material/Stack';
import { Box } from "@mui/material";
import Typography from '@material-ui/core/Typography';
import Avatar from '@mui/material/Avatar';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const ReaderHome = ({ authUser, token }) => {
  const navigate = useNavigate();
  const [bio, setBio] = useState("")
  const [crBooks, setCrBooks] = useState([])
  const [dnfBooks, setDnfBooks] = useState([])
  const [readBooks, setReadBooks] = useState([])
  const [wrBooks, setWrBooks] = useState([])
  const viewBook = (bookId) => {
    navigate(`/viewBook/${bookId}`);
  }

  const config = {
    headers: { Authorization: `Bearer ${token}` }
  };

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

   // Get initial list of feedback
   useEffect(() => {
    axios.get(`http://localhost:8083/books/getAllBooksByReaderId?uid=${authUser.uid}`,config)
    .then ((result) => {
      const feedbackList = result.data;
      setCrBooks(feedbackList.filter(book => book.progress === "cr"));
      setDnfBooks(feedbackList.filter(book => book.progress === "dnf"));
      setReadBooks(feedbackList.filter(book => book.progress === "read"));
      setWrBooks(feedbackList.filter(book => book.progress === "wtr"));
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
        searchBarEnabled={true} />

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


            <Box sx={{ flexGrow: 5 }}>
              <Stack direction="column" spacing={2}>
                <Box >
                  <Stack direction="column" spacing={2} sx={{ display: 'flex', justifyContent: 'left', marginBottom: 2 }}>
                    {/* Currently reading */}
                    <Box
                      textAlign="left"
                      border={1}
                      borderRadius={5}
                      padding={2}
                      display="block"
                    >
                      <Typography variant="header1" style={{ fontWeight: 'bold', fontSize: '1.2rem', margin: 2 }}>
                        <a href="/currentlyReading" style={{ color: '#1E5949' }}> {/* TODO: Add link and number of total books*/}
                          Currently Reading ({crBooks.length})
                        </a>
                      </Typography>

                      <div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap' }}>
                        {crBooks.map(crBook => (
                          <Stack direction='row' spacing={2} sx={{ display: 'flex', justifyContent: 'left', margin: 1 }}>
                            <button onClick={() => viewBook(crBook.book_id)} style={{ border: 'none', padding: 0, background: 'none' }}>
                              <img
                                src={crBook.cover_link}
                                width="110px"
                                height="auto"
                                margin={2}
                                style={{ cursor: 'pointer', margin: '2px' }}
                                alt={`Book cover of ${crBook.title}`}
                              />
                            </button>
                          </Stack>
                        )
                        )}
                      </div>
                    </Box>

                  </Stack>

                  <Stack direction="column" spacing={2} sx={{ display: 'flex', justifyContent: 'left', marginBottom: 2 }}>
                    {/* Want to read */}
                    <Box
                      textAlign="left"
                      border={1}
                      borderRadius={5}
                      padding={2}
                    >
                      <Typography variant="header1" style={{ fontWeight: 'bold', fontSize: '1.2rem' }}>
                        <a href="/wantToRead" style={{ color: '#1E5949' }}>
                          Want to Read ({wrBooks.length})
                        </a>
                      </Typography>
                      <div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap' }}>
                        {wrBooks.map(wrBook => (
                          <Stack direction='row' spacing={2} sx={{ display: 'flex', justifyContent: 'left', margin: 1 }}>
                            <button onClick={() => viewBook(wrBook.book_id)} style={{ border: 'none', padding: 0, background: 'none' }}>
                              <img
                                src={wrBook.cover_link}
                                width="110px"
                                height="auto"
                                margin={2}
                                style={{ cursor: 'pointer', margin: '2px' }}
                                alt={`Book cover of ${wrBook.title}`}
                              />
                            </button>
                          </Stack>
                        )
                        )}
                      </div>
                    </Box>
                  </Stack>

                  <Stack direction="column" spacing={2} sx={{ display: 'flex', justifyContent: 'left', marginBottom: 2}}>
                    {/* Read */}
                    <Box
                      textAlign="left"
                      border={1}
                      borderRadius={5}
                      padding={2}
                      display="block"
                    >
                      <Typography variant="header1" style={{ fontWeight: 'bold', fontSize: '1.2rem' }}>
                        <a href="/read" style={{ color: '#1E5949' }}>
                          Read ({readBooks.length})
                        </a>
                      </Typography>
                      <div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap' }}>
                        {readBooks.map(readBook => (
                          <Stack direction='row' spacing={2} sx={{ display: 'flex', justifyContent: 'left', margin: 1 }}>
                            <button onClick={() => viewBook(readBook.book_id)} style={{ border: 'none', padding: 0, background: 'none' }}>
                              <img
                                src={readBook.cover_link}
                                width="110px"
                                height="auto"
                                margin={2}
                                style={{ cursor: 'pointer', margin: '2px' }}
                                alt={`Book cover of ${readBook.title}`}
                              />
                            </button>
                          </Stack>
                        )
                        )}
                      </div>
                    </Box>

                  </Stack>

                  <Stack direction="column" spacing={2} sx={{ display: 'flex', justifyContent: 'left'}}>
                    {/* Did not finish */}
                    <Box
                      textAlign="left"
                      border={1}
                      borderRadius={5}
                      padding={2}
                      display="block"
                    >
                      <Typography variant="header1" style={{ fontWeight: 'bold', fontSize: '1.2rem' }}>
                        <a href="/didNotFinish" style={{ color: '#1E5949' }}>
                          Did Not Finish ({dnfBooks.length})
                        </a>
                      </Typography>
                      <div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap' }}>
                        {dnfBooks.map(dnfBook => (
                          <Stack direction='row' spacing={2} sx={{ display: 'flex', justifyContent: 'left', margin: 1 }}>
                            <button onClick={() => viewBook(dnfBook.book_id)} style={{ border: 'none', padding: 0, background: 'none' }}>
                              <img
                                src={dnfBook.cover_link}
                                width="110px"
                                height="auto"
                                margin={2}
                                style={{ cursor: 'pointer', margin: '2px' }}
                                alt={`Book cover of ${dnfBook.title}`}
                              />
                            </button>
                          </Stack>
                        )
                        )}
                      </div>
                    </Box>
                  </Stack>
                </Box>
              </Stack>
            </Box>
          </Stack>
        </Box>
      </div >
    </div >
  );
};

export default ReaderHome;