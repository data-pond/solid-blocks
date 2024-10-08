import { Button } from './button'

export const ButtonDocs = () => {
  return (
    <>
      <h2 id="button-docs">Button</h2>
      <p>
        The button component is meant as a versatile form or standalone button.
      </p>
      <div class="example">
        It comes as <Button rectangle={true}>rectangle</Button>,
          <Button color="secondary" rounded={true}>Secondary Round</Button>,
          <Button color="primary" outline={true}>Primary OUtliner</Button>,
          <Button color="secondary" help={true}>Secondary Help</Button>,
          <Button color="secondary" transparent={true}>Secondary Transparent</Button>,
          <a color="link"  href={""}>Link</a>

      </div>
      <h3>Properties</h3>
      <pre>
        {`
ButtonProps {
  variant?: 'primary' | 'secondary' | 'link' | 'icon';
}
`}
      </pre>
      <p>The default variant is primary. Otherwise, all HTML attributes applying to the button element can be used here.</p>
      <hr />
    </>
  );
};
