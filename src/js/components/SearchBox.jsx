import React from 'react';
import { withRouter } from 'react-router';

/**
 * todo comment
 */
class SearchBox extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            query: this.props.match.params.query || ''
        }
    }

    static getDerivedStateFromProps(nextProps) {
        return {
            query: nextProps.match.params.query || ''
        };
    }

    handleSubmit = (e) => {
        e.preventDefault();

        if (this.state.query && this.state.query.length > 1) {
            this.props.history.push('/search/' + this.state.query);
        }
    };

    handleChange = (e) => {
        this.setState({query: e.target.value});
    };

    render() {

        return (
            <form className="search-box" onSubmit={this.handleSubmit}>
                <input type="text"
                       className="search-box__input"
                       placeholder="search"
                       onChange={this.handleChange}
                       value={this.state.query}/>
                <button className="search-box__submit"/>
            </form>
        )
    }
}

export default withRouter(SearchBox);
