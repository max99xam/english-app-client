import React from 'react';

import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import {Grid} from "@material-ui/core";



const sections = [
  { title: 'WORDS', url: '/' },
  { title: 'TESTS', url: '/tests' },
  { title: 'GAMES', url: '/games' },
  { title: 'STATISTIC', url: '/stat' },
];

interface Props {}
const Categories: React.FC<Props> = ({}) => {



  return (
    <>
      <Toolbar component="nav" >
        <Grid
          container
          direction="row"
          justifyContent="center"
          alignItems="center"
          spacing={5}
          >
          {sections.map((section) => (
            <Grid key={section.url} item>
              <Button href={section.url}  color="primary" style={{opacity: '50%'}}>
                {section.title}
              </Button>
            </Grid>
          ))}
        </Grid>
      </Toolbar>
    </>
  );
};
export default Categories;
