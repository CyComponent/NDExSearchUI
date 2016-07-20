
import DropDownMenu from 'material-ui/DropDownMenu'
import MenuItem from 'material-ui/MenuItem'
import React from 'react'

import {
  Card,
  CardActions,
  CardHeader,
  CardMedia,
  CardTitle,
  CardText
} from 'material-ui/Card'

import RaisedButton from 'material-ui/RaisedButton'

class Image extends React.Component {

  constructor(props) {
    super(props)
    this.state = {value: "name"}
  }

  time(T) {
    var d = new Date(0)
    d.setUTCSeconds(T/1000.0)
    return d.toLocaleDateString()
  }

  handleSelection(NWS, NW) {
    const index = NWS.indexOf(NW)
    const network = this.props.networkSummaries.get(index)
    this.props.cartActions.addNetwork(network)
  }

  sort(sortOn, networks) {
    networks.sort(function(a, b) {
      return a[sortOn] > b[sortOn]
    })
    return networks
  }

  setSortOn(value) {
    this.setState({value})
  }

  render() {
    const cardStackStyle = {
      height: '95%'
    }
    var networkSummaries = this.props.networkSummaries.toJS()
    var networks = networkSummaries.map(N => {
      N.modificationTime = this.time(N.modificationTime)
      N.creationTime = this.time(N.creationTime)
      return N
    })
    var sortedNetworks = this.sort(this.state.value, networks)
    return (
     <div style = {cardStackStyle}>
       <div>
         <RaisedButton
           label="Sort by name"
           secondary={true}
           onClick={this.setSortOn.bind(this, "name")}
         />
         <RaisedButton
           label="Sort by owner"
           secondary={true}
           onClick={this.setSortOn.bind(this, "owner")}
         />
         <RaisedButton
           label="Sort by visibility"
           secondary={true}
           onClick={this.setSortOn.bind(this, "visibility")}
         />
       </div>
       <div style={{ overflow: 'scroll', height: '95%' }}>
         {sortedNetworks.map(N => (
            <Card style={{ margin: "20"}}>
              <CardHeader
                title={"Created on " + N.creationTime}
                subtitle={"Modified on " + N.modificationTime}
              />
              <CardMedia>
                <NetworkImage N={N}/>
              </CardMedia>
              <CardTitle title={N.name} subtitle={N.owner}/>
              <CardText>{N.description}</CardText>
              <CardActions>
                <RaisedButton
                  label="Add to Cart"
                  primary={true}
                  onClick={this.handleSelection.bind(this, networks, N)}
                />
              </CardActions>
            </Card>
            )
          )}
        </div>
      </div>
    )
  }
}

class NetworkImage extends React.Component {

  constructor(props) {
    super(props)
    this.state = { error: false }
  }

  error = () => {
    console.log("Called error")
    this.setState({ error: true })
  }

  render() {
    var style = {}
    if (this.state.error) {
      style = { display: 'none' }
    }
    return (
      <img
        src={"http://ci-dev-serv.ucsd.edu/" + this.props.N.externalId + ".png"}
        onError={this.error}
        style={Object.assign({ width: '50%', minWidth: 0, display: 'block', margin: 'auto' }, style)}
      />
    )

  }

}


const ImageViz = {
  iconName: 'view_stream',
  plugin: Image
}

export default ImageViz
