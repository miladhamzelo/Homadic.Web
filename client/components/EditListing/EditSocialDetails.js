import React from 'react';
import { browserHistory } from 'react-router';
import { apiGetListing, apiUpdateSocialDetails } from '../../api';
import ListingHeader from '../ListingHeader/ListingHeader';
import LoadingPlane from '../LoadingScreen/LoadingPlane';
import Hero from '../ListingTemplate/components/Hero';
import SocialDetailsEditor from '../EditComponents/SocialDetailsEditor';

class EditSocialDetails extends React.Component {
    constructor(props) {
        super(props);

        this.handleChange = this.handleChange.bind(this);
        this.handleSaveChanges = this.handleSaveChanges.bind(this);
        this.handleGoBack = this.handleGoBack.bind(this);

        this.state = {
            error: undefined,
            loading: true
        }
    }

    UNSAFE_componentWillMount() {
        let { params, setNewListing } = this.props;

        this.setState({ loading: true, error: undefined });

        apiGetListing(params.listingSlug).then((response) => {
            setNewListing(response.data);
            this.setState({ loading: false, error: undefined });
        }).catch(() => {
            browserHistory.push('/');
        });
    }

    handleGoBack(e) {
        e.preventDefault();

        browserHistory.push('/listing/' + this.props.params.listingSlug);
    }

    handleSaveChanges(e) {
        e.preventDefault();
        let { slug, social_details } = this.props.addListing.listing;

        this.setState({ loading: true, error: undefined });

        apiUpdateSocialDetails(slug, social_details).then(() => {
            browserHistory.push('/listing/' + slug + '?updated=true');
        }).catch((e) => {
            this.setState({ loading: false, error: e });
        });
    }

    handleChange(e) {
        const target = e.target;
        let value = target.type === 'checkbox' ? target.checked : target.value;
        let key = target.name;

        // check if int or string
        value = target.getAttribute('data-type') === 'int' ? parseFloat(value) : value;

        this.props.updateInputProp(key, value);
    }

    renderLoaded() {
        let { listing } = this.props.addListing;

        return (
            <div className="listing">
                <Hero listing={listing} />
                <div className="content-box">
                    <SocialDetailsEditor socialDetails={listing.social_details} handleChange={this.handleChange} />
                </div>
                <div className="text-center">
                    <div className="btn-group" role="group" aria-label="Do stuff">
                        <button className="btn" onClick={this.handleGoBack}><i className="far fa-save"></i> Back</button>
                        <button className="btn btn-action" onClick={this.handleSaveChanges}><i className="far fa-save"></i> Save</button>
                    </div>
                </div>
            </div>
        );
    }

    render() {
        let { error, loading } = this.state;

        return (
            <div className="listing">
                <ListingHeader {...this.props} full />
                <div className="container mb-4">
                    {error != undefined ? <div className="alert alert-danger">{error}</div> : undefined}
                    {loading ? <LoadingPlane /> : this.renderLoaded()}
                </div>
            </div>
        )
    }
}

export default EditSocialDetails;