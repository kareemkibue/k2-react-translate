import * as React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import styled from 'styled-components';
import { Translator, useTranslate } from '../../src';
import { Status } from '../Status';

const Home: React.FunctionComponent<RouteComponentProps> = (props) => {
	const { match } = props;
	const { translateAndParse } = useTranslate<string>();

	return (
		<>
			<TitleWrapper>
				{/* // Component alternative to useTranslate hook for  >v16.8.0 react installations */}
				<Translator id="WELCOME" />
				{translateAndParse('FLAG_IMAGES')}
			</TitleWrapper>
			<Status match={match} />
		</>
	);
};

const TitleWrapper = styled.h1`
	display: flex;

	span {
		display: flex;
		align-items: flex-end;
		margin-left: 30px;
	}

	img {
		max-width: 75px;
	}
`;

export { Home };
