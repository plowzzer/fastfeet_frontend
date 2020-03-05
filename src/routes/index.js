import React from 'react';
import { Switch } from 'react-router-dom';
import Route from './Route';

import SignIn from '~/pages/SignIn';
import Packages from '~/pages/Packages';
import PackagesDetail from '~/pages/PackagesDetail';
import Deliverymen from '~/pages/Deliverymen';
import DeliverymenDetail from '~/pages/DeliverymenDetail';
import Recipients from '~/pages/Recipient';
import RecipientDetail from '~/pages/RecipientDetail';
import Problems from '~/pages/Problems';

export default function Routes() {
	return (
		<Switch>
			<Route path="/" exact component={SignIn} />

			{/* Package routes */}
			<Route path="/packages" exact component={Packages} isPrivate />
			<Route
				path="/packages/:id/edit"
				exact
				component={PackagesDetail}
				isPrivate
			/>
			<Route path="/packages/new" exact component={PackagesDetail} isPrivate />

			{/* Deliverymen Routes */}
			<Route path="/deliverymen" exact component={Deliverymen} isPrivate />
			<Route
				path="/deliverymen/:id/edit"
				exact
				component={DeliverymenDetail}
				isPrivate
			/>

			<Route
				path="/deliverymen/new"
				exact
				component={DeliverymenDetail}
				isPrivate
			/>

			{/* Recipients Routes */}
			<Route path="/recipients" exact component={Recipients} isPrivate />
			<Route
				path="/recipients/:id/edit"
				exact
				component={RecipientDetail}
				isPrivate
			/>

			<Route
				path="/recipients/new"
				exact
				component={RecipientDetail}
				isPrivate
			/>

			{/* Problems Routes */}
			<Route path="/problems" exact component={Problems} isPrivate />

			<Route path="/" component={() => <h1>404</h1>} />
		</Switch>
	);
}
