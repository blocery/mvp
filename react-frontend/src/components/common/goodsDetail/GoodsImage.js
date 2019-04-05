import React, { Component, Fragment } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleLeft, faAngleRight, faShoppingCart, faCarrot, faAppleAlt, faCartPlus, faCartArrowDown, faStar, faStarHalf,
    faShareAlt

} from '@fortawesome/free-solid-svg-icons'

import _ from 'lodash'
import GoodsThumbnail from './GoodsThumbnail'
import {Server} from '../../Properties'

//const imageUrl = 'http://localhost:8080/images/'

export default class GoodsImage extends Component{
    constructor(props){
        super(props)

        this.state = {
            selectedIndex: 0,
            selectedImageNo: this.props.images[0].imageNo,
            images: this.props.images
        }
    }
    onBackClicked = () => {
       this.setImage(this.decreaseIndex())
    }
    onNextClicked = () => {
        this.setImage(this.increaseIndex())
    }

    decreaseIndex = () => {
        return this.state.selectedIndex -1
    }
    increaseIndex = () => {
        return this.state.selectedIndex +1
    }


    setImage = (index) => {

        if(index < 0 || index === this.state.images.length)
            return

        this.setState({
            selectedIndex: index
        })
    }

    onThumbnailClicked = (e) => {
        const imageNo = e.target.id
        const images = this.state.images
        let selectedIndex = _.findIndex(images, image => image.imageNo == imageNo)
        this.setImage(selectedIndex)
    }



    render(){

        const src = Server.getImageURL() + this.state.images[this.state.selectedIndex].imageUrl

        return(
            <Fragment>

                <div className='container-goods-img'>
                    <img className='img-big' src={src}/>
                    <div className='btn-back' onClick={this.onBackClicked}><FontAwesomeIcon icon={faAngleLeft} size={'2x'} /></div>
                    <div className='btn-next' onClick={this.onNextClicked}><FontAwesomeIcon icon={faAngleRight} size={'2x'} /></div>
                </div>

                <GoodsThumbnail selectedIndex={this.state.selectedIndex} images={this.state.images} onClick={this.onThumbnailClicked} />
            </Fragment>
        )
    }
}