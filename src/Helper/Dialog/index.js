import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';


// Add to calender
import AddCalendar from 'react-add-to-calendar'

class ScrollDialog extends React.Component {
  state = {
    open: false,
    scroll: 'paper'
  };

  handleClickOpen = scroll => () => {
    this.setState({ open: true, scroll });
  };

  handleOpen = () => {
    this.setState({
      open: true
    })
  }

  handleClose = () => {
    this.setState({ open: false });
  };

  addCalendar = () => {
    let event = {
      title: this.props.personName,
      description: `Meet ${this.props.personName} at ${this.props.VenueName}`,
      location: this.props.VenueAdd,
      startTime: `${this.props.meetingDate}T20:${this.props.meetingTime}`,
      endTime: `${this.props.meetingDate}T20:${this.props.meetingTime}`,
    }
    this.setState({
      event : event
    })
  }

  render() {
    const { data } = this.props;
    return (
      <div>
        {/* <Button onClick={this.handleClickOpen('body')}>scroll=body</Button> */}

        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          scroll={this.state.scroll}
          aria-labelledby="scroll-dialog-title"
        >

          <DialogTitle id="scroll-dialog-title">Subscribe</DialogTitle>
          <DialogContent>
            <DialogContentText>
              {/* {console.log(data.pictures[0])} */}
              {/* {data.pictures[0] && <img src={data.pictures[0]} width='80px' alt="" />} */}
              Venue : {data.VenueAdd}
              <br />
              Address : {data.VenueName}
              <br />
              Date: {data.meetingDate}
              <br />
              Time : {data.meetingTime}
              <br />
              My Name: {data.personName}
              <br />
            </DialogContentText>
          </DialogContent>
          <DialogActions>

            <Button onClick={this.handleClose} color="primary">
              Decline Request
            </Button>
            <Button onClick={this.addCalendar} color="primary">
              Add To Calender
            </Button>

          </DialogActions>
        </Dialog>

        <button><AddCalendar event={this.state.event} /></button>
      </div>
    );
  }
}

export default ScrollDialog;
