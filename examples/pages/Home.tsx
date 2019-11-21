import * as React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { Translator } from '../../src';
import { Status } from '../Status';

const Home: React.FunctionComponent<RouteComponentProps> = (props) => {
	const { match } = props;

	return (
		<>
			<h1>
				{/* // Component alternative to useTranslate hook for  >v16.8.0 react installations */}
				<Translator id="WELCOME" />
			</h1>
			<Status match={match} />
		</>
	);
};

export { Home };
