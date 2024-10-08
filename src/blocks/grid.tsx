import {Component, JSX, splitProps, Show, JSXElement, createEffect, createMemo} from "solid-js";

import "./base.css";
import "./grid/index.scss";

export type hAlign = 'start'| 'end' | 'center' | 'between' | 'around' | 'evenly';
export type vAlign = 'start'| 'end' | 'center' | 'baseline' | 'stretch';

export type colAlign = 'start' | 'center' | 'end' 

export type RowProps = JSX.HTMLAttributes<HTMLDivElement> & {
    hAlign?: hAlign,
    vAlign?: vAlign,
    children: JSXElement | JSXElement[]
}

export const Row: Component<RowProps> = (props: RowProps) => {


    const [selected, others] = splitProps(props, ['hAlign', 'vAlign',  'class'])

    const className = createMemo(() => {
        const cl = selected.class ? [selected.class] : [];
        cl.push("row");
        if (props.hAlign) {
            cl.push(`hAlign-${props.hAlign}`)
        }
        if (props.vAlign) {
            cl.push(`vAlign-${props.vAlign}`)
        }
        console.log('calculated classename is ', cl.join(' '))
        return cl.join(" ")
    })

    return <div class={className()} {...others} />
}
/**
 * start {
 *     align-content: flex-start;
 *   }
 *
 *   &end {
 *     align-content: flex-end;
 *   }
 *
 *   &center {
 *     align-content: center;
 *   }
 *
 *   &stretch {
 *     align-content: stretch;
 *   }
 *
 *   &between {
 *     align-content: space-between;
 *   }
 *
 *   &around {
 *     align-content: space-around;
 *   }
 */
export type ColProps = JSX.HTMLAttributes<HTMLDivElement> &  {
    "size"?: number,
    "sm"?: number,
    "md"?: number,
    "lg"?: number,
    "xl"?: number,
    "xxl"?: number,
    align?: 'start' | 'end' | 'center' | 'stretch'| 'between'| 'around'
    children: JSXElement | JSXElement[]
}
export const Col: Component<ColProps> = (props: ColProps) => {
    const [selected, others] =
        splitProps(props, ['sm', 'size',  'md', 'lg', 'xl', 'xxl', 'align', 'class'])

    const className = createMemo(() => {
        const cl = selected.class ? [selected.class] : [];
        cl.push(selected.size ? `col-${selected.size}` : 'col');
        if (selected.sm) {
            cl.push(`col-sm-${selected.sm}`)
        }
        if (selected.md) {
            cl.push(`col-md-${selected.md}`)
        }
        if (selected.lg) {
            cl.push(`col-lg-${selected.lg}`)
        }
        if (selected.xl) {
            cl.push(`col-xl-${selected.xl}`)
        }
        if (selected.xxl) {
            cl.push(`col-xxl-${selected.xxl}`)
        }
        if (selected.align) {
            cl.push(`col-align-${selected.align}`)
        }
        return cl.join(" ")
    })

    return <div class={className()} {...others} />
}
