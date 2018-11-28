import React from 'react';
import Navigation from '../../components/container/Navigation';
import MyTripsDashboard from '../../components/container/MyTripsDashboard';
import { Query } from "react-apollo";
import GET_MY_TRIPS from '../apollo/get_my_trips';
import { baseURL } from '../../helpers/constants'

const MyTrips_page = (props) => {

  const userID = localStorage.getItem('id');
  if (!userID) window.location.replace(baseURL + '/auth');
  const MyTripsApollo = () => (
    <Query
      query={GET_MY_TRIPS}
      variables ={{id : userID}}
      errorPolicy="all"
    >
      {({ loading, error, data }) => {
        if (loading) return <p>Loading...</p>;
        return (
          <div>
            <Navigation textContent="My trips" avatarURL={data.User.avatarURL} />
            <MyTripsDashboard history={props.history} info={data.tripsByUserID} />
          </div>
        );
      }}
    </Query>
  );
  return (
    <MyTripsApollo />
  );
}


export default MyTrips_page;

/*
  Here is the first page the user should naturally join. We should receive from this page the user ID and will fetch:
  on schema :
    email
    firstName
    lastName
  not on schema:
    profile image
    information about subscribed trips
*/