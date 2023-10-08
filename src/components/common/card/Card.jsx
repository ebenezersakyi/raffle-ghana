import * as React from "react";
// import { useTheme } from '@mui/material/styles';
// import Box from '@mui/material/Box';
// import Card from '@mui/material/Card';
// import CardContent from '@mui/material/CardContent';
// import CardMedia from '@mui/material/CardMedia';
// import IconButton from '@mui/material/IconButton';
// import Typography from '@mui/material/Typography';
// import SkipPreviousIcon from '@mui/icons-material/SkipPrevious';
// import PlayArrowIcon from '@mui/icons-material/PlayArrow';
// import DeleteIcon from '@mui/icons-material/Delete';
// // import LikeIcon from '@mui/icons-material/heart';
// import { Button } from '@mui/material';

import { useNavigate } from "react-router-dom";

import "./Card.css";

export default function MediaControlCard({ item, firebaseHouseData }) {
  const [numberOfTicketsSold, setNumberOfTicketsSold] = React.useState([]);
  // const theme = useTheme();
  const navigate = useNavigate();

  const firebaseData = firebaseHouseData[0];

  function shortenNumber(num) {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + "m";
    } else if (num >= 1000) {
      return (num / 1000).toFixed(1) + "k";
    } else {
      return num.toString();
    }
  }

  React.useEffect(() => {
    console.log("itemgaga", item);
    randomNumber();
  }, []);

  const randomNumber = () => {
    const min = 10000;
    const max = 50000;
    const randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
    // setNumberOfTicketsSold(randomNumber);
    setNumberOfTicketsSold(firebaseData.ticketsSold);
    // console.log("firebaseData.ticketsSold", firebaseData.ticketsSold);
    // return {randomNumber: randomNumber.toLocaleString(), percentage: (randomNumber/100000)&100}
  };

  const toDetails = () => {
    navigate("/house-detail", {
      state: {
        data: item,
        ticketsSold: numberOfTicketsSold,
      },
    });
  };

  return (
    // <Card onClick={() => {navigator(`/houseinfo/${item._id}`)}} sx={{ display: 'flex', width: '100%', position:'relative' }}>
    //   <Box sx={{ display: 'flex', flexDirection: 'column', posititon: 'absolute', left: 0, justifyContent: 'flex-start' }}>
    //     <CardContent sx={{ flex: '1 0 auto' }}>
    //       <Typography sx={{ position: 'absolute', left: 10, top: 10 }} component="div" variant="h6">
    //         $ {item.price}
    //       </Typography>
    //       <Typography sx={{ display: 'flex', position: 'absolute', top: 40, left: 10 }} variant="subtitle1" color="text.secondary" component="div">
    //         {item.country}
    //       </Typography>
    //       <Typography sx={{ display: 'flex', position: 'absolute', top: 60, left: 10 }}>
    //         <IconButton disabled={true}>
    //           <DeleteIcon />
    //         </IconButton>
    //       </Typography>
    //     </CardContent>
    //     <Box sx={{ display: 'flex', alignItems: 'center', pl: 1, pb: 1 }}>
    //       <Button sx={{ backgroundColor: item.forSale? '#ffdbdb' : '#bfbfbf' }} color='inherit' variant="contained" href="">
    //         {item.forSale? 'For sale' : 'For rent' }
    //       </Button>
    //     </Box>
    //   </Box>
    //   <CardMedia
    //     component="img"
    //     sx={{ width: '50%', right: 0, position: 'absolute', height:'100%' }}
    //     image={item.houseImage[0]}
    //     alt="Live from space album cover"
    //   />
    // </Card>

    <div className="card__container__div" onClick={toDetails}>
      <div className="card__img__div">
        <img src={item.houseImage[0]} alt="" />
      </div>
      <div className="card__details__div">
        {/* <p className="house__price__card">$ {shortenNumber(item.price)}</p> */}
        <span className="house__price__card">
          100,000 <p className="house__details__card">tickets</p>
        </span>
        <span className="house__details__card">
          <b>{numberOfTicketsSold.length}</b> (
          {((numberOfTicketsSold.length / 100000) * 100).toFixed(0)}%) tickets
          sold
        </span>
        <p className="house__details__card">{item.country}</p>
        {/* <p className="house__details__card">{item.homeType}</p> */}
      </div>
    </div>
  );
}
