import React from 'react'

import { PluginView } from 'cy-ui'

export default class Result extends React.Component {

  render() {
    const style = {
      width: "30em",
      flexGrow: 1,
      display: 'flex',
      flexDirection: 'column'
    }

    const pluginStyle = {
      flexGrow: 2,
    }

    var { visualizations, ...pluginProps } = this.props
    return (
        <div id="viz" style={style}>
          <PluginView
            plugins={visualizations}
            {...pluginProps}
            style={pluginStyle}
          />
        </div>
    )
  }

}
