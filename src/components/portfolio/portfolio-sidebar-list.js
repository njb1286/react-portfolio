import React from 'react';

const PortfolioSidebarList = props => {
    const portfolioList = props.data.map(e => {
        return (
            <div key={e.id} className='portfolio-item-thumb'>
                <div className='portfolio-thumb-img'>
                    <img src={e.thumb_image_url} />
                </div>
                <h1 className='title'>{e.name}</h1>
                <h2>{e.description}</h2>
            </div>
        )
    })

    return (
        <div className='portfolio-sidebar-list-wrapper'>
            {portfolioList}
        </div>
    )
}

export default PortfolioSidebarList;