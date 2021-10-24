import React, { memo, useState, useCallback } from "react";
import Grid from '@material-ui/core/Grid';
import Dustbin from "./Dustbin";
import Box from "./Box";

let productArray = [{
  index: 0
},{
  index: 1
},{
  index: 2
},{
  index: 3
},{
  index: 4
}];

const Container = () => (<div style={{ marginTop: 30 }}>
  <Grid container spacing={3}>
  <Grid sm={6}>
      <Box name="/images/dnd/baklawa-louz.jpg"/>
      <Box name="/images/dnd/bjawiya-fekia.jpg"/>
      <Box name="/images/dnd/boule-dentel-noisette.jpg"/>
      <Box name="/images/dnd/boule-diamant-pistache.jpg"/>
      <Box name="/images/dnd/kaak-ambar.jpg"/>
      <Box name="/images/dnd/kaak-warka-dentele.jpg"/>
      <Box name="/images/dnd/kaak-warka.jpg"/>
      <Box name="/images/dnd/perle-blanc.jpg"/>
      <Box name="/images/dnd/samsa-sesame-amande.jpg"/>
      <Box name="/images/dnd/baklawa-pistache.jpg"/>
  </Grid>
  <Grid sm={6}>
  {productArray.map(p => <div style={{ overflow: 'hidden', clear: 'both', flexGrow: 1 }}>
    <Dustbin allowedDropEffect={`0${p.index}`}><Box name="/images/dnd/baklawa-louz.jpg"/></Dustbin>
    <Dustbin allowedDropEffect={`1${p.index}`}/>
    <Dustbin allowedDropEffect={`2${p.index}`}/>
    <Dustbin allowedDropEffect={`3${p.index}`}/>
    <Dustbin allowedDropEffect={`4${p.index}`}/>
  </div>)
  }
  </Grid>
  </Grid>
</div>);

export default Container;