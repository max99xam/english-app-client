import React from 'react';
import { Icon, Input, Label, Menu, Table } from 'semantic-ui-react';
import { Word } from 'types/types';
import { Row } from './Row';
import { RowWithEdit } from './RowWithEdit';
import { WordsTableProps } from './WordsTable.props';



export const WordsTable = ({ words }: WordsTableProps): JSX.Element => {

	if (!words) {
		return <h1>No words</h1>
	}

	const rowsPerPage = words.length < 5 ? words.length : 5;
	const rows = words.slice(0, rowsPerPage)
		.sort((a, b) => (a.id < b.id ? -1 : 1));


	const [rowsEditStatus, setRowsEditStatus] = React.useState<boolean[]>(new Array(rows.length).fill(false));

	const toggleIsEditingNow = (index: number) => {
		setRowsEditStatus(rowsRowsEdit => {
			const newRowsEditStatus = [...rowsEditStatus];
			newRowsEditStatus[index] = !rowsRowsEdit[index];
			return newRowsEditStatus;
		})
	}

	return (
		<>
			<Table basic style={{ width: '98%', backgroundColor: 'white' }}>
				<Table.Header >
					<Table.Row textAlign='center'>
						<Table.HeaderCell >Id</Table.HeaderCell>
						<Table.HeaderCell >English</Table.HeaderCell>
						<Table.HeaderCell >Transcription</Table.HeaderCell>
						<Table.HeaderCell >Translation</Table.HeaderCell>
						<Table.HeaderCell >Status</Table.HeaderCell>
						<Table.HeaderCell ></Table.HeaderCell>
					</Table.Row>
				</Table.Header>

				<Table.Body>
					{rowsEditStatus.map((rowEditStatus, index) => {
						return rowEditStatus ? (
							<RowWithEdit rowData={rows[index]} key={rows[index].id} toggleIsEditingNow={() => toggleIsEditingNow(index)} />
						) : (
							<Row rowData={rows[index]} key={rows[index].id} toggleIsEditingNow={() => toggleIsEditingNow(index)} />
						);
					})}
				</Table.Body>

				<Table.Footer>
					<Table.Row>
						<Table.HeaderCell colSpan="6">
							<Menu floated="right" pagination>
								<Menu.Item as="a" icon>
									<Icon name="chevron left" />
								</Menu.Item>
								<Menu.Item as="a">1</Menu.Item>
								<Menu.Item as="a">2</Menu.Item>
								<Menu.Item as="a">3</Menu.Item>
								<Menu.Item as="a">4</Menu.Item>
								<Menu.Item as="a" icon>
									<Icon name="chevron right" />
								</Menu.Item>
							</Menu>
						</Table.HeaderCell>
					</Table.Row>
				</Table.Footer>
			</Table>
		</>
	);
};