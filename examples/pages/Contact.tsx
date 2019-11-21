import * as React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { useTranslate } from '../../src';
import { Status } from '../Status';

const Contact: React.FunctionComponent<RouteComponentProps> = (props) => {
	const { match } = props;
	const { translate } = useTranslate<string>();

	return (
		<>
			<h1>{translate('CONTACT_US')}</h1>
			<Status match={match} />
		</>
	);
};

export { Contact };
