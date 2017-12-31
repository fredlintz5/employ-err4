import React from 'react';
import "./ModalSwipe.css"



function ModalSwipe(props) {
	return (
		<div className="modal fade" id="swipeModal" tabIndex="-1" role="dialog" aria-hidden="true">
			<div className="modal-dialog" role="document">
				<div className="modal-content">
					<div className="modal-header">
						<h5 className="modal-title" >{props.data[0] && props.data[0].displayName.slice(0,35)}</h5>
						<button type="button" className="close" data-dismiss="modal" aria-label="Close">
							<span aria-hidden="true">&times;</span>
						</button>
					</div>
					<div className="modal-body">
						<div id="modal-image">
							<img src={props.data[0] && props.data[0].image} alt="Employer Modal"/>
							<a onClick={() => props.thumbsDown()}><i className="fa fa-thumbs-down" aria-hidden="false"></i></a>
							<a onClick={() => props.thumbsUp()}><i className="fa fa-thumbs-up" aria-hidden="false"></i></a>
						</div>
						<div id="modal-text">
							<p>{props.data[0] && props.data[0].title.slice(0,35)}</p>
							<p>{props.data[0] && props.data[0].bio.slice(0,35)}</p>
						</div>
					</div>
				</div>
			</div>
		 </div>
	)
}

export default ModalSwipe;