import React from 'react'
import {Server} from '../../Properties'

const GoodsThumbnail = (props) => {

    //const thumbnailUrl = 'http://localhost:8080/thumbnails/'

    return (
        <div className='container-goods-img-list'>
            {
                props.images.map(({imageNo, imageNm, imageUrl}, index)=>{
                    return(
                    <img
                        key={'thumbnail_'+imageUrl}
                        id={imageNo}
                        src={Server.getThumbnailURL() +imageUrl}
                        className={props.selectedIndex === index ? 'active' : ''}
                        onClick={props.onClick}
                    />
                    )
                })
            }
        </div>
    )
}

export default GoodsThumbnail