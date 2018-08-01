import React, { Component } from 'react'
import { CardImg, Card } from 'reactstrap'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import './ResultImage.css'
import logic from '../logic'

class ResultImage extends Component {
  constructor(props) {
    super(props);
    console.log('SpotifyPlayer', 'init')
    this.state = {
      modal: false,
      error: '',
      favorite: logic.isFavorite(this.props.image.objectNumber)
    };

    this.toggle = this.toggle.bind(this);
  }

  toggle() {
    this.setState({
      modal: !this.state.modal
    });
  }

componentWillMount() {
    console.log('SpotifyPlayer', 'will mount')
}

componentDidMount() {
    console.log('SpotifyPlayer', 'did mount')
}

componentWillUnmount() {
    console.log('SpotifyPlayer', 'will unmount')
}

componentWillUpdate() {
    console.log('SpotifyPlayer', 'will update')
}

componentDidUpdate() {
    console.log('SpotifyPlayer', 'did update')
}

componentWillReceiveProps(newProps) {
    console.log('SpotifyPlayer', 'will receive props')

    this.refreshFavorite(newProps)
}

onToggleFavorite = () => {
    logic.toggleImageFavorite(this.props.image.objectNumber)
        .then(() => {
          this.refreshFavorite(this.props)})
        .catch(({ message }) => this.setState({ error: message }))
}

refreshFavorite(props) {
    this.setState({ favorite: logic.isFavorite(this.props.image.objectNumber) })
}

  render() {
    const {favorite } = this.state
    return (
      <div>
        <i className={(favorite ? "fas fa-star" : "far fa-star")}onClick={this.onToggleFavorite}></i>
        <img src={this.props.image.imageurl} alt={this.props.image.title} onClick={this.toggle}/>
        
        <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className} >
          <ModalHeader toggle={this.toggle}>{this.props.image.title}</ModalHeader>
          <ModalBody>
          <img className="imageList"src={this.props.image.imageurl} alt={this.props.image.title}/>
          <h5>Title:</h5><p>{this.props.image.longTitle}</p>
          <h6>Maker:</h6><p>{this.props.image.maker}</p>
          </ModalBody>
          <ModalFooter>
      
            <Button color="primary" onClick={this.toggle}>Do Something</Button>{' '}
            <Button color="secondary" onClick={this.toggle}>Cancel</Button>
          </ModalFooter>
        </Modal>
      </div>
    )


  }
}

export default ResultImage