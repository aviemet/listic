import React from 'react';
import clsx from 'clsx';
import { createStyles, lighten, makeStyles, Theme } from '@material-ui/core/styles';

import Container from '@material-ui/core/Container';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';

import DeleteIcon from '@material-ui/icons/Delete';
import FilterListIcon from '@material-ui/icons/FilterList';

const Lists = () => {
	return (
		<Container>

			<TableContainer>
				<Table>
					<TableHead>
						<TableRow>
							<TableCell><TableSortLabel>Title</TableSortLabel></TableCell>
							<TableCell><TableSortLabel>Date</TableSortLabel></TableCell>
							<TableCell><TableSortLabel>Guests</TableSortLabel></TableCell>
							<TableCell><TableSortLabel>Actions</TableSortLabel></TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						<TableRow>
							<TableCell>Value</TableCell>
							<TableCell>Value</TableCell>
							<TableCell>Value</TableCell>
							<TableCell>Value</TableCell>
						</TableRow>
					</TableBody>
				</Table>
			</TableContainer>

		</Container>
	)
}

export default Lists
