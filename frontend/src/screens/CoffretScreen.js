import React, { useEffect } from 'react';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import Grid from '@material-ui/core/Grid';
import { useDispatch, useSelector } from 'react-redux';
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend';
import Container from '../components/dnd/Container';

export default function HomeScreen() {
  const dispatch = useDispatch();
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div style={{ flexGrow: 1 }}>
    <Grid spacing={3}>
      <DndProvider backend={HTML5Backend}>
					<Container />
				</DndProvider>
    </Grid>
    </div>
  );
}
