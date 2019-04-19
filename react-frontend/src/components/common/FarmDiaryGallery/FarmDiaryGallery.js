import React, {Component, Fragment} from 'react'
import { FarmDiaryCard } from '../cards'
import Style from './FarmDiaryGallery.module.scss'


export default class FarmDiaryGallery extends Component{
    constructor(props){
        super(props)
    }
    //이미지 클릭시
    onClick = (e) => {
        const { data } = this.props
        const src = e.target.src
        const item = data.filter(item => item.src === src)
        this.props.onClick(item)
    }
    render(){
        return(
            <Fragment>
                <div className={Style.wrap}>
                    {
                        this.props.data.map((item, index)=>{
                            return <FarmDiaryCard key={item.src+index} {...item} onClick={this.onClick}/>
                        })
                    }
                </div>
            </Fragment>
        )
    }
}
