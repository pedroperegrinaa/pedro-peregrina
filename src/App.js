import logo from './logo.svg';
import './App.css';

import * as React from 'react';
import ReactDOM from 'react-dom';

// LIST
import Box from '@mui/material/Box';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import { FixedSizeList } from 'react-window';

// CARD
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea, CardActions } from '@mui/material';

//PAGINAÇÃO
import TablePagination from '@mui/material/TablePagination';

import { SafeAreaView, View, FlatList, StyleSheet, Text } from 'react';
import { useState, useEffect } from 'react';

import axios from 'axios';

function RenderRow(props) {
  const { index, style, data } = props;
  console.log('props', props);

  return (
<ListItem style={style} key={index} component="div" disablePadding>

  
  <Card sx={{ maxWidth: 800 }}>
<CardActionArea>
        {/* <CardMedia
          component="img"
          height="400"
          image={data[index].imageUrl}
          alt="green iguana"
        /> */}
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
          {data[index].title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            
          {data[index].summary}
          <br></br>
          {data[index].publishedAt}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
</ListItem>
  );
}

function App() {

  const [articles, setArticles] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const json = await axios.get("https://api.spaceflightnewsapi.net/v3/articles");
      console.log(json.data);
      setArticles(json.data);
    }
    fetchData()
      .catch(console.error);
  }, [])

  const [page, setPage] = useState(2);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  return (
    <>

{/* <TablePagination
      component="div"
      count={100}
      page={page}
      onPageChange={handleChangePage}
      rowsPerPage={rowsPerPage}
      onRowsPerPageChange={handleChangeRowsPerPage}
    /> */}
        <Box
      sx={{ width: '100%', height: 400, maxWidth: 360, bgcolor: 'background.paper' }}
    >
      <FixedSizeList
        itemData={articles}
        height={2000}
        width={600}
        itemSize={160}
        itemCount={articles.length}
        overscanCount={10}
      >
        {RenderRow}
      </FixedSizeList>
    </Box>
    </>
  );
}

console.log(StyleSheet);

export default App;
