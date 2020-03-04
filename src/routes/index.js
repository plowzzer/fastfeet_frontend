import React from 'react';
import { Switch } from 'react-router-dom';
import Route from './Route';

import SignIn from '~/pages/SignIn';
import Packages from '~/pages/Packages';
import PackagesDetail from '~/pages/PackagesDetail';
import Deliverymen from '~/pages/Deliverymen';

export default function Routes() {
	return (
		<Switch>
			<Route path="/" exact component={SignIn} />
			<Route path="/packages" exact component={Packages} isPrivate />
			<Route
				path="/packages/:id/edit"
				exact
				component={PackagesDetail}
				isPrivate
			/>
			<Route path="/packages/new" exact component={PackagesDetail} isPrivate />

			<Route path="/deliverymen" exact component={Deliverymen} isPrivate />

			<Route path="/" component={() => <h1>404</h1>} />
		</Switch>
	);
}
