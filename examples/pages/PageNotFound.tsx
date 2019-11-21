import * as React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { useTranslate } from '../../src';
import { Status } from '../Status';

const PageNotFound: React.FunctionComponent<RouteComponentProps> = (props) => {
	const { match } = props;
	const { translate } = useTranslate<string>();

	return (
		<>
			<h1>{translate('PAGE_NOT_FOUND')}</h1>
			<Status match={match} />
		</>
	);
};

export { PageNotFound };
