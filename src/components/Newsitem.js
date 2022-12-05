// import PropTypes from 'prop-types'
import React from 'react'

const Newsitem =(props)=> {
  // static propTypes = {}

    let {title, description, imageUrl, newsUrl, author, date, source} = props
    return (
      <div>
        <div className="card">
        <span className="position-absolute badge rounded-pill bg-danger" style={{zindex:1,right:'0', top:'-2%'}}>{source}</span>
          <img src={imageUrl} className="card-img-top" alt="..."/>
          <div className="card-body">
            <h5 className="card-title">{title}...</h5>
            <p className="card-text">{description}...</p>
            <p className="card-text"><small className   ="text-muted">{author} on {new Date(date).toGMTString()}</small></p>
            <a href={newsUrl} target='_blank'rel="noreferrer" className="btn btn-sml btn-dark">Read More</a>
          </div>
        </div>
      </div>
    )
   
}

export default Newsitem
