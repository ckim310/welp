import React from 'react';
import { withRouter, Redirect, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { createReview, clearReviewErrors } from '../../actions/review_actions';
import NavBarRight from '../nav_bar/nav_bar_right_container';

class ReviewForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      body: "",
      author_id: this.props.currentUserId,
      business_id: this.props.businessId,
      rating: 0,
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleRating = this.handleRating.bind(this);
  }

  componentWillUnmount() {
    this.props.clearReviewErrors();
  }

  handleSubmit(e) {
    e.preventDefault();
    const { businessId } = this.props.match.params;
    const review = Object.assign({}, this.state);
    this.props.createReview(businessId, review).then(() => this.props.history.push(`/businesses/${businessId}`));
  }

  handleInput(field) {
    return (e) => {
      this.setState({ [field]: e.target.value });
    };
  }

  handleRating(field) {
    return (e) => {
      let rating;
      switch(e.currentTarget.id) {
        case 'one':
        rating = 1;
        this.setState({ [field]: rating });
        break;
        case 'two':
        rating = 2;
        this.setState({ [field]: rating });
        break;
        case 'three':
        rating = 3;
        this.setState({ [field]: rating });
        break;
        case 'four':
        rating = 4;
        this.setState({ [field]: rating });
        break;
        case 'five':
        rating = 5;
        this.setState({ [field]: rating });
        break;
        default:
        rating = 0;
        this.setState({ [field]: rating });
        break;
      }
    };
  }

  render() {
    const businessId = this.props.match.params.businessId;
    const  { business } = this.props;

      if (!business) {
        return <Redirect to={`/businesses/${businessId}`} />
      }

    const errors = this.props.errors.map((err, idx) => {
      return <li key={idx}>Error: {err}</li>
    });

    return (
      <div className="review-form-page">
        <div className="review-form-top">
          <div className="review-form-header">
            <div className="review-form-header-title">
              <h1 className="home-logo">
                <Link to="/">welp<i className="fab fa-yelp"></i></Link>
              </h1>
              <div className="write-review-title">
                Write A Review
              </div>
            </div>
            <NavBarRight />
          </div>
        </div>

        <div className="review-form-container">
          <div className="review-form-wrapper">
            <div className="errors">
              {errors}
            </div>

            <div className="review-title">
              <h2 className="review-business-name">
                <Link to={`/businesses/${business.id}`}>
                  {business.name}
                </Link>
              </h2>
            </div>

            <div className="review-form-content">
              <form className="review-form" onSubmit={this.handleSubmit}>
                <div className="review-body-container">
                  <div className="review-body-content">
                    <div className="review-form-rating">
                      &nbsp; Select your rating
                      <div className={"rating-big" + (this.state.rating === 5 ? " show-star" : " ")} id="five" value="5" onClick={this.handleRating("rating")}></div>
                      <div className={"rating-big" + (this.state.rating === 4 ? " show-star" : " ")} id="four" value="4" onClick={this.handleRating("rating")}></div>
                      <div className={"rating-big" + (this.state.rating === 3 ? " show-star" : " ")} id="three" value="3" onClick={this.handleRating("rating")}></div>
                      <div className={"rating-big" + (this.state.rating === 2 ? " show-star" : " ")} id="two" value="2" onClick={this.handleRating("rating")}></div>
                      <div className={"rating-big" + (this.state.rating === 1 ? " show-star" : " ")} id="one" value="1" onClick={this.handleRating("rating")}></div>
                    </div>

                    <textarea
                      name="review-body"
                      id="review-body"
                      placeholder="Your review helps others learn about great local businesses.

                      Please don't review this business if you received a freebie for writing this review, or if you're connected in any way to the owner or employees."
                      onChange={this.handleInput('body')}
                      ></textarea>
                  </div>
                </div>

                <div className="review-post">
                  <button className="review-form-create">Post Review</button>
                </div>
              </form>
            </div>
          </div>

        </div>
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  const businessId = ownProps.match.params.businessId;
  const business = state.entities.businesses[businessId];
  const currentUserId = state.session.currentUserId;
  const errors = state.errors.review;

  return {
    businessId,
    business,
    currentUserId,
    errors,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    createReview: (businessId, review) => dispatch(createReview(businessId, review)),
    clearReviewErrors: () => dispatch(clearReviewErrors()),
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ReviewForm));