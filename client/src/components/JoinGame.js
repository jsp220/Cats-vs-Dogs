import React from "react";
import { Link } from "react-router-dom";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import AddCircleIcon from '@mui/icons-material/AddCircle';


class JoinGame extends React.Component {
  constructor(props) {
    super(props);
    this.state = { value: "" };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.setState({ value: event.target.value });
  }

  render() {
    return (
      <div className="col-12 col-md-6 m-1">
        <Card sx={{ minWidth: 275 }}>
          <CardContent className="col-12">
            <Typography
              sx={{ fontSize: 16 }}
              color="text.secondary"
              gutterBottom
            >
              Join game
            </Typography>
            <form className="form-inline">
              <div className="form-group">
                <Typography component="div">
                  <input
                    type="text"
                    value={this.state.value}
                    onChange={this.handleChange}
                    className="form-control"
                    name="keyword"
                    placeholder="Enter the three word code"
                  />
                </Typography>
                <Typography component="div">

                <Link to={`/game/${this.state.value}`}>
                  <BottomNavigationAction
                  //  className="btn btn-primary"
                   type="submit"
                   for="code"
                   label="game"
                   icon={<AddCircleIcon sx={{ fontSize: 60 }} />}
                  
                   >
                    Search
                  </BottomNavigationAction>
                </Link>
                </Typography>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    );
  }
}

export default JoinGame;
