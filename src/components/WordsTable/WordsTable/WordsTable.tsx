import React from 'react';
import { useWords } from 'hooks';
import { Label, Loader, Pagination, PaginationProps, Segment, Table } from 'semantic-ui-react';
import { Row } from '../Row/Row/Row';
import { WordsTableProps } from './WordsTable.props';
import styles from './WordsTable.module.scss';
import { json } from 'stream/consumers';

const defaultWordsPerPageCount = 5;

export const WordsTable = ({ mode }: WordsTableProps): JSX.Element => {
	// const [currentPage, setCurrentPage] = useLocalStorage<number>(CURRENT_TABLE_PAGE + mode, 1);
	const [currentPage, setCurrentPage] = React.useState(1);
	const [totalPages, setTotalPages] = React.useState(1);
	const [skip, setSkip] = React.useState(0);
	const [wordsPerPageCount, setWordsPerPageCount] = React.useState(0);

	const { words, loading, count: wordsCount, mutate: mutateWords } = useWords(mode, skip, wordsPerPageCount);

	// Pagination logic.
	React.useEffect(() => {
		if (wordsCount) {
			const pagesCount = wordsCount > defaultWordsPerPageCount ? Number(Math.ceil(wordsCount / defaultWordsPerPageCount)) : 1;
			setTotalPages(pagesCount);

			if (currentPage > pagesCount) {
				setCurrentPage(pagesCount);
			}
		}
		//Mutate here for correct display after deleting word.
		mutateWords();
	}, [wordsCount, JSON.stringify(words)])

	// Logic for correct display rows count.
	React.useEffect(() => {
		let wordsPerPage = 0;
		if (wordsCount) {
			if (wordsCount < defaultWordsPerPageCount) {
				wordsPerPage = wordsCount;
			} else if (currentPage == (totalPages) && (currentPage != 1)) { // for last page
				wordsPerPage = wordsCount - (currentPage - 1) * defaultWordsPerPageCount;
			} else {
				wordsPerPage = defaultWordsPerPageCount;
			}
		}
		setWordsPerPageCount(wordsPerPage)
		setSkip((currentPage - 1) * defaultWordsPerPageCount);
	}, [currentPage, wordsCount])


	// Handlers.
	const handlePaginationChange = (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>, { activePage }: PaginationProps) => {
		setCurrentPage(Number(activePage) || 1);
	}

	if (loading) {
		return (
			<Segment>
				<Loader size='massive' active inline='centered' />
			</Segment>
		);
	}

	if (words && !words.length) {
		return <h1>No words yet </h1>
	}

	return (
		<>
			<Label size='big' color='blue' className={styles.titleLabel}>
				All words
				<Label.Detail>{wordsCount}</Label.Detail>
			</Label>
			<Table basic style={{ width: '90%', backgroundColor: 'white', margin: '0 auto' }}>

				<Table.Body>
					{words.map((word, index) => {
						return (
							<Row rowData={word} rowId={skip + index + 1} key={word.id} />);
					})}
				</Table.Body>

				<Table.Footer>
					<Table.Row>
						<Table.HeaderCell textAlign='center' colSpan="16">
							<Pagination
								className={styles.pagination}
								activePage={currentPage}
								onPageChange={handlePaginationChange}
								// boundaryRange={boundaryRange}
								// onPageChange={this.handlePaginationChange}
								// size='mini'
								// siblingRange={siblingRange}
								totalPages={totalPages}
							// // Heads up! All items are powered by shorthands, if you want to hide one of them, just pass `null` as value
							// ellipsisItem={showEllipsis ? undefined : null}
							// firstItem={showFirstAndLastNav ? undefined : null}
							// lastItem={showFirstAndLastNav ? undefined : null}
							// prevItem={showPreviousAndNextNav ? undefined : null}
							// nextItem={showPreviousAndNextNav ? undefined : null}
							/>
						</Table.HeaderCell>
					</Table.Row>
				</Table.Footer>
			</Table>
		</>
	);
};
