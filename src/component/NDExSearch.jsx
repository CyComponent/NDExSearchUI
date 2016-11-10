import React from 'react'
import Paper from 'material-ui/Paper'

import Search from './search/Search'
import Result from './result/Result'

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

import '../style/valet.scss'

export default class NDExSearch extends React.Component {

  static defaultProps = {
    style: {
      width: '100%',
      height: '100%',
      overflow: 'hidden'
    },
    defaultQuery: "",
    theme: {},
    filters: [],
    visualizations: [],
    onLoad: () => {}
  }

  componentDidMount() {
    console.log("Ndex actions")
    console.log(this.props)
    this.props.ndexActions.search(this.props.defaultQuery)
  }

  render() {
    var {
      theme,
      filters,
      summaries,
      ndexActions,
      visualizations,
      ...pluginProps
    } = this.props
    const muiTheme = getMuiTheme(theme)

    const containerStyle = {
      display: 'flex',
      flexDirection: 'row',
      overflow: 'hidden'
    }

    return (
      <MuiThemeProvider muiTheme={muiTheme}>
        <div style={this.props.style}>
          <div style={containerStyle}>
            <Search
              filters={filters}
              ndexActions={ndexActions}
              defaultQuery={this.props.defaultQuery}
            />
           <Result
              visualizations={visualizations}
              summaries={summaries}
              { ...pluginProps}
            />
          </div>
        </div>
      </MuiThemeProvider>
    )
  }

}
