# Listic

A real time guest list app for non-persistent guest data.

Built with React and Firebase

### DB Structure

```
roles: enum('admin', 'owner', 'editor', 'user')

events: {
	|key|: {
		date: date,
		title: string,
		lists: [
			{
				key: |listKey|,
				guestCount: int // Updated automatically with list create/delete
			}
		],
		createdBy: userId,
		acl: [
			{
				user: |user|,
				role: |role|
			}
		]
	}
}

lists: {
	|key|: {
		title: string,
		description: text,
		guests: [
			{
				firstName: string,
				lastName: string,
				notes: text,
				arrived: datetime,
				tags: [string]
				guests: [
					{ 
						firstName: string,
						lastName: string,
						arrived: datetime
					}
				]
			}
		],
		acl: [
			{
				user: |user|,
				role: |role|
			}
		]
	}
}
```

### Notes
Keep this in mind when theming MUI with styled-components
https://material-ui.com/guides/interoperability/#styled-components

Interesting example:

```
import React from 'react';
import styled from 'styled-components';
import Button from '@material-ui/core/Button';

const StyledButton = styled(({ color, ...other }) => (
  <Button classes={{ label: 'label' }} {...other} />
))`
  background-color: #6772e5;
  box-shadow: 0 4px 6px rgba(50, 50, 93, 0.11), 0 1px 3px rgba(0, 0, 0, 0.08);
  padding: 7px 14px;
  &:hover {
    background-color: #5469d4;
  }
  & .label {
    color: #fff;
  }
`;

export default function StyledComponentsDeep() {
  return (
    <div>
      <Button>Default</Button>
      <StyledButton>Customized</StyledButton>
    </div>
  );
}
```

### Setup

After running `yarn`, install the firebase cli tools:
`npm i -g firebase-tools`

Initialize the firebase project:
`firebase init`

Before testing, initialize the firebase emulator:
`firebase init emulators`
