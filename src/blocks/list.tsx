import { createMemo, JSXElement } from "solid-js";
import { Row, RowProps, Col } from "./grid";

import  './list.scss';



export type ListItemProps =   {
    clickable: boolean,
    
    children: JSXElement | JSXElement[]
}


export const ListItemSide = (props) => {
    return <Col size={2} align={"center"}>{props.children}</Col>
}

export const ListItemContent = (props) => {
    return <Col align={"center"}>{props.children}</Col>
}

export const ListItem = (props: ListItemProps ) => {
    const cl = createMemo(() => {
        const cn = ['item']
        if (props.clickable) {
            cn.push('clickable')
        }
        return cn.join(' ')
    });
    return <div class={cl()}>
        {props.children}
    </div>
}



export const List = (props: {
    horizontal?: boolean,
    padding?: boolean,
    bordered?: boolean,
    compact?: boolean,
    children: JSXElement[]
}) => {

    const classNames = createMemo(() => {
        const cl = ["list"];
        if (props.padding) {
            cl.push("padding")
        }
        if (props.bordered) {
            cl.push("bordered")
        }
        if (props.horizontal) {
            cl.push("horizontal")
        }
        if (props.compact) {
            cl.push("compact")
        }
        return cl.join(" ")
    })
    

    return <div class={classNames()}>
        {props.children}
    </div>
}