import React from 'react';
import "./ModalSwipe.css"



function ModalSwipe(props) {
	return (
		<div className="modal fade" id="swipeModal" tabIndex="-1" role="dialog" aria-hidden="true">
			<div className="modal-dialog" role="document">
				<div className="modal-content">
					<div className="modal-body" style={{padding: "0px"}}>
						<div id="modal-image">
							<img src={props.data[0] ? props.data[0].image : "https://tinyurl.com/ybgx3yx8"} alt="Employer Modal"/>
							<a style={props.data[0] ? {display: "block"} : {display: 'none'}} onClick={() => props.thumbsDown()}><i className="fa fa-thumbs-down" aria-hidden="false"></i></a>
							<a style={props.data[0] ? {display: "block"} : {display: 'none'}} onClick={() => props.thumbsUp()}><i className="fa fa-thumbs-up" aria-hidden="false"></i></a>
						</div>
						<div className="modal-footer text-center" id="modal-text">
							<p style={{fontSize: "1.5em"}}>{props.data[0] ? props.data[0].displayName.slice(0,35) : "YOU ARE OUT OF MATCHES"}</p>
							<p>{props.data[0] ? props.data[0].title.slice(0,35) : ""}</p>
							<p>{props.data[0] ? props.data[0].bio.slice(0,35) : ""}</p>
							<button type="button" id="close" data-dismiss="modal" aria-label="Close">
								<span aria-hidden="true">&times;</span>
							</button>
						</div>
					</div>
				</div>
			</div>
		 </div>
	)
}

export default ModalSwipe;