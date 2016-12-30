"use strict"

import React, { Component } from 'react'
import { render } from 'react-dom'
import { Page, List, ListItem, Input } from 'react-onsenui'

import { DatePicker } from './exporter'

const App = content => (
  <Page>
    <h3> Datepicker </h3>

    <List>

      <ListItem>
        <label> Feeling </label>
        <Input placeholder = 'how do you feel today?' />
      </ListItem>

      <ListItem>
        <label> Select a date </label>
        <DatePicker onSelectDate = {date => console.log(date)} />
      </ListItem>

      <ListItem>
        Urgent task?
      </ListItem>

    </List>
  </Page>
);

render(<App />, document.getElementById('app-root'));