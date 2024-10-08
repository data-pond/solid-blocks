
import { Row,Col, hAlign, vAlign, colAlign } from "./grid";
import {createSignal} from "solid-js";
import {Button} from "./button";


export const GridDocs = () => {

    const allowedHValues: Array<hAlign>=  ['start', 'end' , 'center' , 'between' , 'around' , 'evenly'];
    const allowedVValues: Array<vAlign>=  ['start', 'end' , 'center' , 'stretch'];

    const allowedColValues: Array<colAlign>=  ['start' , 'end' , 'center'];

    const [hAlign, setHAlign] = createSignal<hAlign>("center")
    const [vAlign, setVAlign] = createSignal<vAlign>("center")
    const [columnAlign, setColAlign] = createSignal<colAlign>("center")

    return <>
        <h1 id="grid-docs">Grid Docs</h1>


        <h2>Row  <small>inherits div</small></h2>
        <p> creates a flex container with a set of align options, good to contain <strong>Col</strong></p>
        <h3>Properties:</h3>
        <dl>
            <dt>hAlign:</dt>
            <dd> {allowedHValues.join(' | ')}</dd>
            <dt>vAlign</dt>
            <dd> {allowedVValues.join(' | ')}</dd>        
        </dl>

        <h2>Col <small>inherits div</small></h2>
        <h3>Properties:</h3>
        <dl>
            <dt>size</dt>
            <dd>The default size , mobile first.</dd>
            <dd> {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].join(' | ')}</dd>
            <dt>sm</dt>
            <dd>Size for sm screens</dd>
            <dd>optional {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].join(' | ')}</dd>
            <dt>md</dt>
            <dd>Size for md screens</dd>
            <dd>optional {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].join(' | ')}</dd>
            <dt>lg</dt>
            <dd>optional {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].join(' | ')}</dd>
            <dt>xl</dt>
            <dd>optional {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].join(' | ')}</dd>
            <dt>xxl</dt>
            <dd>optional {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].join(' | ')}</dd>
            <dt>align</dt>

            <p>The column is also a flex container.</p>
            <dd> {allowedColValues.join(' | ')}</dd>
            <dt>children</dt>
            <dd></dd>
        </dl>

        <pre>
        {`
<Row hAlign="left" vAlign="center">
    
   <Col size="12" sm="6" md="4">
    Column 1
   </Col>
   <Col size="12" sm="6" md="4">
    Column 2
   </Col>  
</Row>
`}
      </pre>

        <h4>Row options</h4>
        <h5>Horizontal Align</h5>
        <div class={"row"}>
            {allowedHValues.map(value =>
                <Button aria-selected={hAlign() == value} onClick={() => {
                    setHAlign(value)
                    console.log('align', hAlign())
                }}>Set Horizontal {value}</Button>)}

        </div>
        <h5>Vertical Align:</h5>
        {allowedVValues.map(value =>
            <Button  aria-selected={vAlign() == value} onClick={() => {
                setVAlign(value)
            }}>Set Vertical Align {value}</Button>)}


        <h4>Column options</h4>
        <p>Column behave as flex containers, so you can nest colums inside column, and the align here are shortcuts from commonly used `hAlign``, and `vAlign` parameters </p>
        {allowedColValues.map(value =>
            <Button  aria-selected={columnAlign() == value}
                     onClick={() => setColAlign(value)}>Set Align {value}</Button>)}



        <Row hAlign={hAlign()} vAlign={vAlign()} style={{background: "red", "min-height": "150px"}}>
            <Col size={4} sm={3} md={2} class="q-pa-md" style={{background: "blue"}} align={columnAlign()}>
            
                <span style={{background: "black", color: "white"}}>Column 1</span>
                
            </Col>
            <Col size={4} sm={3} md={2} style={{background: "green"}} align={columnAlign()}>
            <span style={{background: "black", color: "white"}}>Column 2</span>
            </Col>
        </Row>


    </>
}