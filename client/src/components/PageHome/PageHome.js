import React, {Component} from 'react';
import Navigator from '../Navigator/Navigator';
import Footer from '../Footer/Footer';
import '../../css/creative.min.css';
import '../../vendor/magnific-popup/magnific-popup.css';
import '../../css/style.css';


class PageHome extends Component {
  render() {
    return (
      <div>
        <Navigator hide="sr-only" home='none'/>
        <header className="masthead text-center text-white d-flex">
          <div className="container my-auto">
            <div className="row">
              <div className="col-lg-10 mx-auto">
                <h1 className="text-uppercase">
                  <strong>Simplifying Talent Management</strong>
                </h1>
                <hr />
              </div>
              <div className="col-lg-8 mx-auto">
                <p className="text-faded mb-5">Easily find and match to interested candidates</p>
                <a className="btn btn-primary btn-xl js-scroll-trigger" href="#about">Find Out More</a>        
               </div>
            </div>
          </div>
        </header>
        <section className="bg-primary" id="about">
          <div className="container">
            <div className="row">
              <div className="col-lg-8 mx-auto text-center">
                <h2 className="section-heading text-white">Swipe right to like someone or swipe left to pass.</h2>
                <hr className="light my-4" />
                <p className="text-faded mb-4">"I was tired of the traditional and often painful methods of trying to find the right talent. The ability to define skill criteria and swipe through candidates based off of initial impression has made my job so much easier and increased our hiring yield by at least 40%"</p>
              </div>
            </div>
          </div>
        </section>
        <section className="cStyle" id="services">
          <div className="row">
            <div className="col-lg-12 text-center">
              <h2 className="section-heading">If candidates swipe right too...</h2>
              <h2 className="section-heading">Its a Match!</h2>
              <hr className="my-4" />
              <h2 className="section-heading">Only people you've matched with can message you</h2>
              <br/>
              <h2 className="section-heading">...And the rest is up to fate!</h2>
            </div>
          </div>
          <hr/>
          <div className="row" style={{marginBottom: "20px"}}>
            <div className="col-lg-4 col-md-6 text-center">
              <div className="service-box mt-5 mx-auto">
                <i className="fa fa-4x fa-paper-plane text-primary mb-3 sr-icons" />
                <h3 className="mb-3">Stay in Touch</h3>
                <p className="text-grey mb-3">In app messaging keeps you connected!</p>
              </div>
            </div>
            <div className="col-lg-4 col-md-6 text-center">
              <div className="service-box mt-5 mx-auto">
                <i className="fa fa-4x fa-desktop text-primary mb-3 sr-icons" />
                <br/>
                <h3 className="mb-4">Make a Connection</h3> 
                <p className="text-grey mb-3">Get a jump on the competition. Create your profile and get started.</p>
                <br/>
              </div> 
            </div>
            <div className="col-lg-4 col-md-6 text-center">
              <div className="service-box mt-5 mx-auto">
                <i className="fa fa-4x fa-newspaper-o text-primary mb-3 sr-icons" />
                <h3 className="mb-4">Remain Up to Date</h3>
                <p className="text-grey mb-3">Receive new candidate notifications based on your criteria.</p>
              </div>
            </div>
          </div>
        </section>
        <Footer />
      </div>
    );
  }
};

export default PageHome;