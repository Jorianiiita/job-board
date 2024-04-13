import {
  createContext,
  Dispatch,
  JSXElementConstructor,
  ReactElement,
  ReactNode,
  ReactPortal,
  SetStateAction,
  useContext,
  useState,
} from 'react';

type ContextType = {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
};

const FlyoutContext = createContext<ContextType | undefined>(undefined);

const Flyout = (props: { children: ReactElement[] }) => {
  const [open, setOpen] = useState(false);

  return (
    <FlyoutContext.Provider value={{ open, setOpen }}>
      {props.children}
    </FlyoutContext.Provider>
  );

  // return (
  //   <div>
  //     <button onClick={() => setOpen(!open)}>Trigger</button>
  //     {open && (
  //       <ul>
  //         <li>Delete</li>
  //         <li>Add</li>
  //         <li>Edit</li>
  //       </ul>
  //     )}
  //   </div>
  // );
};

const Toggel = (props: { children: string }) => {
  const { open, setOpen } = useContext(FlyoutContext) as ContextType;
  return <button onClick={() => setOpen(!open)}>{props.children}</button>;
};

const List = (props: { children: ReactElement[] }) => {
  const { open } = useContext(FlyoutContext) as ContextType;
  return <>{open && <ul>{props.children}</ul>}</>;
};

const ListItem = (props: { children: string }) => {
  return <li>{props.children}</li>;
};

const ImageEditFlyout = () => {
  return (
    <Flyout>
      <Toggel>Trigger</Toggel>
      <List>
        <ListItem>Add</ListItem>
        <ListItem>Edit</ListItem>
        <ListItem>Delete</ListItem>
      </List>
    </Flyout>
  );
};

export default ImageEditFlyout;
