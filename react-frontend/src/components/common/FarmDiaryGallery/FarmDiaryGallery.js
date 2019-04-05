import React, {Component, Fragment} from 'react'
import FarmDiary from './FarmDiaryGallery.scss'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLeaf, faDolly, faTruckMoving } from '@fortawesome/free-solid-svg-icons'

import Card from './Card'

export default class FarmDiaryGallery extends Component{
    constructor(props){
        super(props)
    }
    //이미지 클릭시
    onImageClicked = (e) => {
        const { data } = this.props
        const src = e.target.src
        const item = data.filter(item => item.src === src)
        this.props.onImageClicked(item)
    }
    render(){
        return(
            <div className={'farm-diary-gallery-flex'}>
                {
                    this.props.data.map((item, index)=>{
                        return (
                            <div key={index}>
                                <Card
                                    {...item}
                                    onImageClicked={this.onImageClicked}
                                />
                            </div>
                        )
                    })
                }
            </div>
        )
    }
}
