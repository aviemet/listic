import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import Link from '@material-ui/core/Link';

const CompoundLink = ({ to, children, ...rest }) => (
	<Link component={ RouterLink } to={ to } { ...rest }>{ children }</Link>
)

export default CompoundLink