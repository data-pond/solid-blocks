import { List, ListItem, ListItemContent, ListItemSide } from "./list";
import { Col } from "./grid";
import { Button } from "./button";
import { createSignal } from "solid-js";

export const ListDocs = () => { 
    const [padding, setPadding] = createSignal(false)
    const [bordered, setBordered] = createSignal(false)
    const [compact, setCompact] = createSignal(false)

    return <>
  <h2 id="list-docs">LIst</h2>
  <p>Quasar style.</p>

<h4>Toggle options</h4>


  <pre >
{`
    <List padding bordered >
    <ListItem clickable={true} >
        <ListItemSide>
            <h3>ICO</h3>
        </ListItemSide>
        <ListItemContent>
            <h5>COntent</h5>
        </ListItemContent>
        <ListItemSide>
            <h3>ICO</h3>
        </ListItemSide>
    </ListItem>

    <ListItem >
        <ListItemSide>
            <img />
        </ListItemSide>
        <ListItemContent>
            <h5>COntent</h5>
        </ListItemContent>
        <ListItemSide>
            <Button outline>ICO</Button>
        </ListItemSide>
    </ListItem>
    
</List>

`}
</pre>

<Button outline  aria-selected={padding()} onClick={() => {
    setPadding(p => !p)
}}> Padding {padding()  ?'active' : 'inactive'}</Button>


<Button aria-selected={bordered()} outline onClick={() => {
    setBordered(p => !p)
}}> Bordered {bordered()  ?'active' : 'inactive'}</Button>

<Button aria-selected={compact()} outline onClick={() => {
    setCompact(p => !p)
}}> Compact {compact()  ?'active' : 'inactive'}</Button>

<List padding={padding()} bordered={bordered()} compact={compact()}>
    <ListItem clickable={true} >
        <ListItemSide>
        <img />
        </ListItemSide>
        <ListItemContent>
            <h5>COntent</h5>
        </ListItemContent>
        <ListItemSide>
        <Button outline>ICO</Button>
        </ListItemSide>
    </ListItem>

    <ListItem >
        <ListItemSide>
            <img />
        </ListItemSide>
        <ListItemContent>
            <h5>COntent</h5>
        </ListItemContent>
        <ListItemSide>
            <Button outline>ICO</Button>
        </ListItemSide>
    </ListItem>
    
</List>

</>
}