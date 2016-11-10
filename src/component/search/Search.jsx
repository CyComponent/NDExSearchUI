import React from 'react'
import Paper from 'material-ui/Paper';

import { PluginView, SearchButton, ExamplePicker } from 'cy-ui'

export default class Search extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      query: this.props.defaultQuery
    }
  }

  updateQuery = (query) => this.setState({ query })

  render() {
    const page = {
      height: "100%",
      width: "20em",
    }
    const boundry = {
      height: '80%',
      width: '90%',
      marginLeft: '5%',
      marginRight: '5%'
    }
    const button = {
      height: '10%'
    }
    return (
        <div style={page}>
          <ExamplePicker
            examples={[
              ["Any mention of melanoma", "melanoma"],
              ["Mention any term in a list: TP53, MDM2, RB1, CDK4", "TP53 MDM2 RB1 CDK4"],
              ["By wildcard: mel*", "mel*"],
              ["Networks with node count between 11 and 79", "nodeCount:[11 TO 79]"],
              ["Use AND for co-occurance", "TP53 AND BARD1"],
              ["Created between 1/1/16 and 4/27/19", "creationTime:[2016-01-01T00:00:01Z TO 2016-04-27T23:59:59Z]"]
            ]}
            search={this.props.ndexActions.search}
            updateQuery={this.updateQuery}
          />
          <Paper style={boundry} zDepth={2}>
            <PluginView
              query={this.state.query}
              updateQuery={this.updateQuery}
              plugins={this.props.filters}
            />
          </Paper>
          <SearchButton
            query={this.state.query}
            search={this.props.ndexActions.search}
            style={button}
          />
        </div>
    )
  }

}
