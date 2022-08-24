import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const PortfolioSidebarList = props => {
    const portfolioList = props.data.map(e => {
        return (
            <div key={e.id} className='portfolio-item-thumb'>
                <div className='portfolio-thumb-img'>
                    <img src={e.thumb_image_url} />
                </div>

                <div className="text-content">
                    <div className='title'>{e.name}</div>
                    <div className="actions">
                        <a className="action-icon" onClick={() => props.handleEditClick(e)}>
                            <FontAwesomeIcon icon="edit" />
                        </a>
                        

                        <a className="action-icon" onClick={() => props.handleDelete(e)}>
                            <FontAwesomeIcon icon="trash" />
                        </a>
                    </div>
                </div>
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