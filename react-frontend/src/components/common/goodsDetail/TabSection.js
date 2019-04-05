import React from 'react'
export default ({items, activeIndex}) => {
    // const items = [{name:'상품설명', active: true},
    //     {name:'구매안내', active: false},
    //     {name:'재배일지(7)', active: false},
    //     {name:'후기(19)', active: false}]
    // const activeIndex = 0

    return(
        <div className='tab-sticky' id={`section${activeIndex}`}>
            {
                items.map((item, index)=>{
                    return(
                            <a
                                href={`#section${index}`}
                                className={index === activeIndex ? 'active': null}

                            >
                                {item.name}
                            </a>
                        )
                })
            }
        </div>
    )
}