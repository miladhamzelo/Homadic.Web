import React from 'react';
import { browserHistory } from 'react-router';
import moment from 'moment';
import { getLoginUrl, loadLocalStorage } from '../../functions';
import LoadingScreen from '../LoadingScreen/LoadingScreen';

class AppView extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            loading: true
        }
    }

    authenticate() {
        let { authentication, handleGetProfile, setLoggedInStatus } = this.props;

        if (!authentication.isLoggedIn) {
            this.setState({ loading: true });

            const auth = loadLocalStorage('auth');
            const isLoggedIn = (!!auth && moment(auth.token_Expiry).isAfter(moment(new Date()))) ? true : false;
            setLoggedInStatus(isLoggedIn);

            if (isLoggedIn) {
                handleGetProfile();
            } else {
                const loginUrl = getLoginUrl(window.location.pathname);
                window.location = loginUrl;
            }
        }

        this.setState({ loading: false });
    }

    componentWillMount() {
        this.authenticate();
    }

    componentWillReceiveProps(nextProps) {
        if (this.props != nextProps) {
            this.authenticate();
        }
    }

    render() {
        let { loading } = this.state;

        return (
            <div>
                {loading ? <LoadingScreen /> : React.cloneElement(this.props.children, this.props)}
            </div>
        )
    }
}

export default AppView;