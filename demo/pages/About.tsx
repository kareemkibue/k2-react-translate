import * as React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { useTranslate } from '../../src';
import { Status } from '../Status';

const About: React.FunctionComponent<RouteComponentProps> = (props) => {
	const { match } = props;
	const { translate } = useTranslate();

	return (
		<>
			<h1>{translate('ABOUT_US')}</h1>
			<Status match={match} />
		</>
	);
};

export { About };
