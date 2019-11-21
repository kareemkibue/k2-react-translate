import * as React from 'react';
import styled from 'styled-components';
import { useTranslate } from '../src';
import { fontFamilies } from './settings/fonts';

interface IProps {
	match: any;
}

const Status: React.FunctionComponent<IProps> = (props) => {
	const { match } = props;
	const { language } = useTranslate<string>();

	console.log({ match });

	return (
		<StatusWrapper>
			<strong>Status</strong>
			<table cellPadding="10">
				<tbody>
					<tr>
						<td>CURRENT LANGUAGE:</td>
						<td>{language}</td>
					</tr>
					<tr>
						<td>match.isExact</td>
						<td>{String(match.isExact)}</td>
					</tr>
					<tr>
						<td>match.params</td>
						<td>{JSON.stringify(match.params)}</td>
					</tr>
					<tr>
						<td>match.path</td>
						<td>{match.path}</td>
					</tr>
					<tr>
						<td>match.url</td>
						<td>{match.url}</td>
					</tr>
				</tbody>
			</table>
		</StatusWrapper>
	);
};

const StatusWrapper = styled.div`
	table {
		margin: 20px 0;
		font-family: ${fontFamilies.monospace};
		font-size: 95%;
		border-collapse: collapse;
	}
`;

export { Status };
