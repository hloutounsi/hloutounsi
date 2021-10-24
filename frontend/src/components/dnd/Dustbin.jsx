import React from 'react';
import { useDrop } from 'react-dnd';

const style = {
    height: '8rem',
    width: '8rem',
    marginRight: '1.5rem',
    marginBottom: '1.5rem',
    color: 'white',
    padding: '1rem',
    textAlign: 'center',
    fontSize: '1rem',
    lineHeight: 'normal',
    float: 'left',
};
export const ItemTypes = {
    BOX: 'box',
  }
  
function selectBackgroundColor(isActive, canDrop) {
    if (isActive) {
        return 'darkgreen';
    }
    else if (canDrop) {
        return 'darkkhaki';
    }
    else {
        return '#222';
    }
}
const Dustbin = ({ allowedDropEffect, children }) => {
    const [{ isOver, canDrop }, drop] = useDrop({
        accept: ItemTypes.BOX,
        canDrop: (item) => {
            console.log(item)
            return item
        },
        drop: (item, monitor) => ({
            name: item.name,
            allowedDropEffect,
        }),
        collect: (monitor) => ({
            isOver: monitor.isOver(),
        }),
    });
    const isActive = canDrop && isOver;
    const backgroundColor = selectBackgroundColor(isActive, canDrop);
    return (<div ref={drop} style={{ ...style, backgroundColor }}>
			{children}
		</div>);
};
export default Dustbin