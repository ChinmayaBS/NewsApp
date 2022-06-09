import React, { Component } from 'react';

export class Newsitem extends Component {
  render() {
      let {title,description,imgUrl,newsUrl,author,date,source}=this.props
    return(
        <div>
            <div className="card mt-4">
                <img src={!imgUrl?"https://c.ndtvimg.com/2021-11/rd5vuvlo_air-india-flight-_625x300_10_November_21.jpg":imgUrl} className="card-img-top" alt="..."/>
                <div className="card-body">
                    <h5 className="card-title">{title} <span class="badge bg-danger">{source}</span></h5>
                    <p className="card-text">{description}</p>
                    <p><small><b>By {!author?"Unknown":author} on {new Date(date).toString()}</b></small></p>
                    <a href={newsUrl} target="_blank" className="btn btn-dark btn-sm">Read More...</a>
                </div>
            </div>
        </div>
    )
  }
}
export default Newsitem;
