import React from 'react';
import { makeStyles, Theme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';

interface TabPanelProps {
  children?: React.ReactNode;
  index: any;
  value: any;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`scrollable-force-tabpanel-${index}`}
      aria-labelledby={`scrollable-force-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Container>
          <Box p={3}>
            <Typography>{children}</Typography>
          </Box>
        </Container>
      )}
    </div>
  );
}

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    flexGrow: 1,
    width: '100%',
    backgroundColor: theme.palette.background.paper,
  },
}));

const ListTabs = ({ lists }) => {
  const classes = useStyles();
  const [ activeTab, setActiveTab ] = React.useState(0);

  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setActiveTab(newValue);
  };

  return (
    <div className={ classes.root }>
      <AppBar position="static" color="default">
        <Tabs
          value={ activeTab }
          onChange={ handleChange }
          variant="scrollable"
          scrollButtons="on"
          indicatorColor="primary"
          textColor="primary"
        >
          { lists.map((list, i) => (
            <Tab key={ i } label={ list.title } />
          )) }
        </Tabs>
      </AppBar>

      { lists.map((list, i) => (
        <TabPanel key={ i } value={ activeTab } index={ i }>
          { list.title }
        </TabPanel>
      )) }
    </div>
  );
}

export default ListTabs
