import React from 'react'
import Style from './GoodsDetail.module.scss'
export default ({items, activeIndex}) => {
    // const items = [{name:'상품설명', active: true},
    //     {name:'구매안내', active: false},
    //     {name:'재배일지(7)', active: false},
    //     {name:'후기(19)', active: false}]
    // const activeIndex = 0

    //TODO history.goBack() 문제로 <a href 를 주석 처리하였음(클릭시 자동 스크롤 해결 해야함)
    return(
        <div className={Style.tabSticky} id={`section${activeIndex}`}>
            {
                items.map((item, index)=>{
                    return(
                            <a
                                key={item.name+index}
                                // href={`#section${index}`}
                                className={index === activeIndex ? Style.active: null}

                            >
                                {item.name}
                            </a>
                        )
                })
            }
        </div>
    )
}