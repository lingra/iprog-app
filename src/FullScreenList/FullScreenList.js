import React, {Component} from 'react';
import './FullScreenList.css';
import {modelInstance} from '../data/MovieModel';
import { Link } from 'react-router-dom';
import listimg from "../images/gradients2.jpg";


class ScreenList extends Component {

  render() {
      
      var test = (<div className="row">
                      <div className="col-sm-1">
                          <span id="movieNum">1</span>
                      </div>
                      <div className="col-sm-3">
                        <table className="image">
                            <tbody>
                                <tr>
                                    <td className="imgTdFs">
                                        <img className="img" draggable="false" alt="hej" src={listimg}/>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                      </div>
                      <div className="col-sm-8">
                          3
                      </div>
                  </div>);
      
      return (
           <div className="container-fluid" id="fullscreenlistpage">
            <div className="row">
                <div className="col-sm-12">
                  <Link to="/main" id="titlelink">
                      <span className="glyphicon glyphicon-home" id="returnHome"></span>
                  </Link>
                </div>
            </div>
           
            <div className="row">
                <div className="row">
                    <div className="col-sm-3">
                        Author:
                        Name
                    </div>
                    <div className="col-sm-8">
                        <p className="pagetitle">My List</p>
                        {test}
                    </div>
                    <div className="col-sm-1">
                        Edit
                    </div>
                </div>
            </div>
        </div>
      );
  }
}

export default ScreenList;

